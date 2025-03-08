'use client';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { UserContext } from '@/contexts/userContext';
import { useRouter, usePathname } from 'next/navigation';
import {
  markNotificationAsRead,
  getAllNotifications,
} from '@/services/notificationServices';
import { INotification } from '@/interfaces/INotification';
import { FaBell } from 'react-icons/fa';
import { io, Socket } from 'socket.io-client';


const NotificationBell = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const socketRef = useRef<Socket | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (user?.response?.user?.id && user?.response?.token) {
      const allNotifications = await getAllNotifications(
        user.response.user.id,
        user.response.token,
        1,
        5
      );
      setNotifications(allNotifications.notifications || []);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Establecer conexión a WebSocket
  useEffect(() => {
    if (user?.response?.user?.id) {
      // Conectar al WebSocket con el namespace 'messages/notifications'
      socketRef.current = io('http://localhost:3000/messages/notifications');

      // Escuchar las notificaciones en tiempo real
      socketRef.current.on(
        'new_notification',
        (notification: INotification) => {
          setNotifications((prevNotifications) => [
            notification,
            ...prevNotifications,
          ]);
        }
      );

      return () => {
        socketRef.current?.disconnect(); // Desconectar al desmontar el componente
      };
    }
  }, [user]);

  useEffect(() => {
    const chatPageRegex = /\/(client-chat|caretaker-chat)\/\d+/;
    if (chatPageRegex.test(pathname)) {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
      );

      unreadNotifications.forEach(async (notification) => {
        if (user?.response?.token) {
          await markNotificationAsRead(notification.id, user.response.token);
        }
      });

      fetchNotifications();
    }
  }, [pathname, notifications, user, fetchNotifications]);

  const handleNotificationClick = async (notification: INotification) => {
    if (user?.response?.token) {
      // Marcar la notificación como leída, pero sin esperar a que termine
      markNotificationAsRead(notification.id, user.response.token);

      setIsOpen(false);

      // Redirección rápida sin esperar que se marque como leída
      if (notification.chatId) {
        if (user.response.user.role === 'user') {
          router.push(`/client-chat/${notification.chatId}`);
        } else if (user.response.user.role === 'caretaker') {
          router.push(`/caretaker-chat/${notification.chatId}`);
        }
      }

      // Actualización de notificaciones en segundo plano (sin bloquear la redirección)
      fetchNotifications();
    }
  };

  if (!user?.response?.user) {
    return null;
  }

  const lastFourNotifications = notifications.slice(0, 4);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2'
        style={{
          color: 'var(--gold-soft)',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = 'var(--gold-light)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
      >
        <FaBell className='text-xl' />
        {Array.isArray(notifications) &&
          notifications.filter((notification) => !notification.isRead).length >
            0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {
                notifications.filter((notification) => !notification.isRead)
                  .length
              }
            </span>
          )}
      </button>

      {isOpen && lastFourNotifications.length > 0 && (
        <div
          className='absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50'
          style={{
            backgroundColor: 'var(--black-light)',
            borderColor: 'var(--gray-600)',
          }}
        >
          <div className='max-h-96 overflow-y-auto'>
            {lastFourNotifications
              .sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1))
              .map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    notification.isRead
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-transparent text-white'
                  }`}
                  style={{ borderColor: 'var(--gray-600)' }}
                >
                  <div className='flex justify-between items-center'>
                    <p
                      style={{
                        color: notification.isRead
                          ? 'var(--gray-800)'
                          : 'var(--white-ivory)',
                      }}
                    >
                      {notification.message}
                    </p>
                    {!notification.isRead && (
                      <span className='text-gold-soft text-xs ml-2'>new!</span>
                    )}
                  </div>
                  <span className='text-xs text-gray-400'>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
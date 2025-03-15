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
import { API_URL } from '../../../envs';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const socketRef = useRef<Socket | null>(null);
  const lastMarkedRef = useRef<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (user?.response?.user?.id && user?.response?.token) {
      const allNotifications = await getAllNotifications(
        user.response.user.id,
        user.response.token,
        1,
        3
      );
      setNotifications(allNotifications.notifications || []);
    }
  }, [user]);

  // Configurar WebSockets para recibir notificaciones en tiempo real
  useEffect(() => {
    if (user?.response?.user?.id) {
      socketRef.current = io(`${API_URL}/messages/notifications`);

      socketRef.current.on('connect', () => {
        console.log('🔗 Conectado al WebSocket');
        socketRef.current?.emit('join', user.response.user.id);
      });

      socketRef.current.on(
        'new_notification',
        (notification: INotification) => {
          console.log('Nueva notificación recibida:', notification);

          // Comprobar si la notificación ya existe
          setNotifications((prevNotifications) => {
            const existingNotificationIndex = prevNotifications.findIndex(
              (notif) => notif.id === notification.id
            );

            if (existingNotificationIndex !== -1) {
              // Si ya existe, actualizarla a "unread" si está leída
              const updatedNotifications = [...prevNotifications];
              if (updatedNotifications[existingNotificationIndex].isRead) {
                updatedNotifications[existingNotificationIndex] = {
                  ...updatedNotifications[existingNotificationIndex],
                  isRead: false, // Cambiar el estado de la notificación a "unread"
                };
              }
              return updatedNotifications;
            }

            // Si no existe, agregarla al principio del array (max 3 notificaciones)
            const updatedNotifications = [notification, ...prevNotifications];
            return updatedNotifications.slice(0, 3);
          });
        }
      );

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [user]);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Marcar notificaciones como leídas al visitar el chat
  useEffect(() => {
    const chatPageRegex = /\/(client-chat|caretaker-chat)\/\d+/;
    const isChatPage = chatPageRegex.test(pathname);
    const isPostPage = pathname === '/client-feed';

    console.log('🔍 Notificaciones:', notifications);

    const unreadNotifications = notifications.filter(
      (notification) =>
        !notification.isRead &&
        !lastMarkedRef.current.has(notification.id) &&
        ((isChatPage && notification.type === 'chat') || // Asegurar coincidencia
          (isPostPage && notification.type === 'post'))
    );

    console.log('🔍 Notificaciones a marcar como leídas:', unreadNotifications);

    if (unreadNotifications.length > 0) {
      lastMarkedRef.current = new Set([
        ...lastMarkedRef.current,
        ...unreadNotifications.map((n) => n.id),
      ]);

      const markAll = async () => {
        if (user?.response?.token) {
          console.log('✅ Marcando notificaciones como leídas...');
          await Promise.all(
            unreadNotifications.map((notification) =>
              markNotificationAsRead(notification.id, user.response.token)
            )
          );
          console.log('🔄 Actualizando lista de notificaciones...');
          fetchNotifications(); // Solo actualizar cuando sea necesario
        }
      };

      markAll();
    }
  }, [pathname, notifications, user, fetchNotifications]);

  // Click en una notificación → marcar como leída y redirigir
  const handleNotificationClick = async (notification: INotification) => {
    if (user?.response?.token) {
      await markNotificationAsRead(notification.id, user.response.token);
      setIsOpen(false);
      if (notification.type === 'post') {
        router.push('/client-feed');
      } else if (notification.chatId) {
        const rolePath =
          user.response.user.role === 'user' ? 'client-chat' : 'caretaker-chat';
        router.push(`/${rolePath}/${notification.chatId}`);
      }
      fetchNotifications(); 
    }
  };

  if (!user?.response?.user) {
    return null;
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2'
        style={{ color: 'var(--gold-soft)', transition: 'color 0.3s ease' }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = 'var(--gold-light)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
      >
        <FaBell className='text-xl' />
        {notifications.some((notification) => !notification.isRead) && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {
              notifications.filter((notification) => !notification.isRead)
                .length
            }
          </span>
        )}
      </button>

      {isOpen && notifications.length > 0 && (
        <div
          className='absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50'
          style={{
            backgroundColor: 'var(--black-light)',
            borderColor: 'var(--gray-600)',
          }}
        >
          <div className='max-h-96 overflow-y-auto'>
            {notifications
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
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

export default NotificationBell;

'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '@/contexts/userContext';
import { useRouter, usePathname } from 'next/navigation';
import { markNotificationAsRead } from '@/services/notificationServices';
import { INotification } from '@/interfaces/INotification';
import { FaBell } from 'react-icons/fa';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../../../envs';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const socketRef = useRef<Socket | null>(null);
  const lastMarkedRef = useRef<Set<string>>(new Set());

  // Establish WebSocket connection for real-time notifications
  useEffect(() => {
    if (user?.response?.user?.id) {
      socketRef.current = io(`${API_URL}/messages/notifications`);
      socketRef.current.on('connect', () => {
        console.log('Socket connected!', user.response.user.id);
        socketRef.current?.emit('join', user.response.user.id); // Join the user to their channel
      });

      socketRef.current.on(
        'new_notification',
        (notification: INotification) => {
          console.log('New notification received:', notification);
          setNotifications((prevNotifications) => {
            const updated = prevNotifications.some(
              (notif) => notif.id === notification.id
            )
              ? prevNotifications
              : [notification, ...prevNotifications].slice(0, 4);
            return updated;
          });
        }
      );

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    const chatPageRegex = /\/(client-chat|caretaker-chat)\/\d+/;
    if (chatPageRegex.test(pathname)) {
      const unreadNotifications = notifications.filter(
        (notification) =>
          !notification.isRead && !lastMarkedRef.current.has(notification.id)
      );

      if (unreadNotifications.length > 0) {
        lastMarkedRef.current = new Set([
          ...lastMarkedRef.current,
          ...unreadNotifications.map((n) => n.id),
        ]);

        const markAll = async () => {
          if (user?.response?.token) {
            await Promise.all(
              unreadNotifications.map((notification) =>
                markNotificationAsRead(notification.id, user.response.token)
              )
            );
          }
        };
        markAll(); // Make sure all notifications are marked as read when entering the page.
      }
    }
  }, [pathname, notifications, user]);

  // Handle notification click: mark as read and navigate to chat page
  const handleNotificationClick = async (notification: INotification) => {
    if (user?.response?.token) {
      await markNotificationAsRead(notification.id, user.response.token);

      // Update local state to mark the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif
        )
      );

      setIsOpen(false);

      if (notification.chatId) {
        if (user.response.user.role === 'user') {
          router.push(`/client-chat/${notification.chatId}`);
        } else if (user.response.user.role === 'caretaker') {
          router.push(`/caretaker-chat/${notification.chatId}`);
        }
      }
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
              .slice(0, 4)
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

export default NotificationBell;

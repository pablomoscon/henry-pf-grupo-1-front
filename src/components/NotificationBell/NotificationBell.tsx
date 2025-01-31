"use client";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { UserContext } from "@/contexts/userContext";
import {
  markNotificationAsRead,
  getAllNotifications,
} from "@/services/notificationServices";
import { INotification } from "@/interfaces/INotification";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (user?.response?.user?.id && user?.response?.token) {
      console.log("Fetching notifications...");
      const allNotifications = await getAllNotifications(
        user.response.user.id,
        user.response.token,
        1,
        5
      );
      console.log("All notifications:", allNotifications);
      setNotifications(allNotifications.notifications || []);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: INotification) => {
    console.log("Clicking notification:", notification.id);
    if (user?.response?.token) {
      console.log("Attempting to mark as read...");
      const success = await markNotificationAsRead(
        notification.id,
        user.response.token
      );
      console.log("Mark as read success:", success);
      if (success) {
        console.log("Refreshing notifications...");
        await fetchNotifications();
      }
    }
  };

  if (!user?.response?.user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
        style={{
          color: "var(--gold-soft)",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--gold-light)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold-soft)")}
      >
        <FaBell className="text-xl" />
        {Array.isArray(notifications) &&
          notifications.filter((notification) => !notification.isRead).length >
            0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {
                notifications.filter((notification) => !notification.isRead)
                  .length
              }
            </span>
          )}
      </button>

      {isOpen && notifications.length > 0 && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: "var(--black-light)",
            borderColor: "var(--gray-600)",
          }}
        >
          <div className="max-h-96 overflow-y-auto">
            {notifications
              .sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1))
              .map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    notification.isRead
                      ? "bg-gray-200 text-gray-800"
                      : "bg-transparent text-white"
                  }`}
                  style={{ borderColor: "var(--gray-600)" }}
                >
                  <div className="flex justify-between items-center">
                    <p
                      style={{
                        color: notification.isRead
                          ? "var(--gray-800)"
                          : "var(--white-ivory)",
                      }}
                    >
                      {notification.message}
                    </p>
                    {!notification.isRead && (
                      <span className="text-gold-soft text-xs ml-2">new!</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
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

import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

// Obtener todas las notificaciones
export const getAllNotifications = async (
  userId: string,
  token: string,
  page: number = 1,
  limit: number = 5
) => {
  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/notifications/user/${userId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response === null || !response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// Obtener notificaciones no leídas
export const getUnreadNotifications = async (userId: string, token: string) => {
  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/notifications?userId=${userId}&isRead=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verificar si la respuesta es null o no es exitosa
    if (response === null || !response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// Marcar una notificación como leída
export const markNotificationAsRead = async (
  notificationId: string,
  token: string
) => {
  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/notifications/${notificationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead: true }),
      }
    );

    // Verificar si la respuesta es null o no es exitosa
    if (response === null || !response.ok) {
      console.error("Failed to mark notification as read");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

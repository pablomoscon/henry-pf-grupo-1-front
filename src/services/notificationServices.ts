export const getAllNotifications = async (
  userId: string,
  token: string,
  page: number = 1,
  limit: number = 5
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/notifications/user/${userId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const getUnreadNotifications = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/notifications?userId=${userId}&isRead=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationAsRead = async (
  notificationId: string,
  token: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/notifications/${notificationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead: true }),
      }
    );
    if (!response.ok) {
      console.error("Failed to mark notification as read");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

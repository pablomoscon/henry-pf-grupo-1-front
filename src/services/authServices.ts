import { API_URL } from "../envs";

export const googleAuth = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const getUserData = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/google/callback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user data");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

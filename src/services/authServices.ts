import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const googleAuth = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const getUserSession = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error('No active session');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

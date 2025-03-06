type LogoutFunction = () => void;
let logoutHandler: LogoutFunction | null = null;
let isLoggingOut = false; // Para evitar múltiples llamadas a logout

export const setLogoutHandler = (handler: LogoutFunction) => {
  logoutHandler = handler;
};

export const fetchWithInterceptor = async (
  url: string,
  options?: RequestInit
): Promise<Response | null> => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options?.headers,
      },
    });

    if (response.status === 401) {
      if (logoutHandler && !isLoggingOut) {
        isLoggingOut = true;
        logoutHandler();
      }
      return null; 
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

type LogoutFunction = () => void;
let logoutHandler: LogoutFunction | null = null;

export const setLogoutHandler = (handler: LogoutFunction) => {
  logoutHandler = handler;
};

export const fetchWithInterceptor = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options?.headers,
      },
    });

    if (response.status === 401) {
      if (logoutHandler) {
        logoutHandler();
      } else {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
      throw new Error("Unauthorized - Redirecting to login");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

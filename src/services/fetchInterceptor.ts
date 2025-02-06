export const fetchWithInterceptor = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      const data = await response.json();
      if (data.message === "Unauthorized") {
        // Clear local storage
        localStorage.removeItem("user");

        // Redirect to home page
        window.location.href = "/";

        throw new Error("Unauthorized - Redirecting to login");
      }
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

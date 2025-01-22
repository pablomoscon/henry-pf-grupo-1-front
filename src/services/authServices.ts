export const googleAuth = async () => {
  try {
    const res = await fetch("http://localhost:3000/auth/google/");
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Google authentication URL not found");
    }
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error;
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/auth/google/callback", {
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

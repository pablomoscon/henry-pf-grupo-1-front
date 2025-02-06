export const googleAuth = () => {
  window.location.href = "http://localhost:3000/auth/google";
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

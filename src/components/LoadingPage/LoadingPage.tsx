"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoadingPage = () => {
  const { isLogged, handleGoogleLogin } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Add a small delay to allow cookie to be set
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("1. All cookies:", document.cookie);

        const authCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth="));

        console.log("2. Auth cookie found:", authCookie);

        if (!authCookie) {
          console.log("3. No auth cookie found, redirecting to login");
          router.push("/login");
          return;
        }

        const cookieValue = decodeURIComponent(authCookie.split("=")[1]);
        console.log("4. Decoded cookie value:", cookieValue);

        const { token, user } = JSON.parse(cookieValue);
        console.log("5. Parsed cookie data:", { token: "REDACTED", user });

        if (!token || !user) {
          console.error("6. Token or user data missing");
          router.push("/login");
          return;
        }

        handleGoogleLogin({ token, user });
        router.push("/profile");
      } catch (error) {
        console.error("7. Error processing cookie:", error);
        router.push("/login");
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      router.push("/login");
    }, 5000);

    if (!isLogged()) {
      console.log("8. User not logged in, fetching data");
      fetchUserData();
    } else {
      console.log("9. User already logged in, redirecting");
      router.push("/profile");
    }

    return () => clearTimeout(timeoutId);
  }, [isLogged, handleGoogleLogin, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const GoogleCallback = () => {
  const router = useRouter();
  const { handleGoogleLogin } = useContext(UserContext);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const error = params.get("error");

        if (error) {
          console.error("Google auth error:", error);
          router.push("/login");
          return;
        }

        if (!token) {
          console.error("No token received");
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/auth/google/callback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get user data");
        }

        const userData = await response.json();
        handleGoogleLogin({ token, user: userData });
        router.push("/dashboard");
      } catch (error) {
        console.error("Error handling Google callback:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [router, handleGoogleLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center" style={{ color: "var(--white-ivory)" }}>
        <p>Processing Google login...</p>
        <p className="text-sm mt-2">
          Please wait while we complete your authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;

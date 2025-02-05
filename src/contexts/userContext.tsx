"use client";
import { LoginResponse, UserData } from "@/interfaces/IUser";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserContextProps {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
  isLogged: () => boolean;
  logOut: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  handleGoogleLogin: (googleData: { token: string; user: UserData }) => void;
  loading: boolean; // Nuevo: indica si el contexto está cargando
  checkTokenExpiration: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLogged: () => false,
  logOut: () => {},
  updateUser: () => {},
  handleGoogleLogin: () => {},
  loading: true, // Nuevo: valor inicial
  checkTokenExpiration: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true); // Nuevo: estado para el loading
  const router = useRouter();

  const checkTokenExpiration = () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const userData = JSON.parse(localUser);
        const tokenTimestamp = userData.tokenTimestamp || 0;
        const currentTime = new Date().getTime();
        const oneHour = 60 * 60 * 1000;

        if (currentTime - tokenTimestamp > oneHour) {
          logOut();
          router.push("/login");
          alert("Your session has expired. Please login again.");
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
        logOut();
      }
    }
  };

  const setUserWithTimestamp = (userData: LoginResponse | null) => {
    if (userData) {
      const userWithTimestamp = {
        ...userData,
        tokenTimestamp: new Date().getTime(),
      };
      localStorage.setItem("user", JSON.stringify(userWithTimestamp));
      setUser(userWithTimestamp);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    // Cargar usuario desde localStorage
    const localUser = localStorage.getItem("user");
    setUser(localUser ? JSON.parse(localUser) : null);
    setLoading(false); // Actualiza el estado de loading después de cargar
  }, []);

  const isLogged = () => {
    return user !== null && user.response.token !== undefined;
  };

  const logOut = async () => {
    alert("You have logged out.");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    localStorage.removeItem("user");
    setUser(null);
    setLoading(true);
    window.location.href = "/";
  };

  const updateUser = (userData: Partial<UserData>) => {
    if (user) {
      const updatedUser = {
        ...user,
        response: {
          ...user.response,
          user: {
            ...user.response.user,
            ...userData,
          },
        },
      };
      setUser(updatedUser);
    }
  };

  const handleGoogleLogin = (googleData: { token: string; user: UserData }) => {
    const formattedResponse: LoginResponse = {
      success: "success",
      response: {
        token: googleData.token,
        user: googleData.user,
      },
      user: googleData.user,
    };
    setUser(formattedResponse);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserWithTimestamp,
        isLogged,
        logOut,
        updateUser,
        handleGoogleLogin,
        loading, // Nuevo: se expone loading en el contexto
        checkTokenExpiration,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

"use client";
import { LoginResponse, UserData } from "@/interfaces/IUser";
import { useState, createContext, useEffect } from "react";
import { setLogoutHandler } from "@/services/fetchInterceptor";

interface UserContextProps {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
  isLogged: () => boolean;
  logOut: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  handleGoogleLogin: (googleData: { token: string; user: UserData }) => void;
  loading: boolean; // Nuevo: indica si el contexto está cargando
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLogged: () => false,
  logOut: () => {},
  updateUser: () => {},
  handleGoogleLogin: () => {},
  loading: true, // Nuevo: valor inicial
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true); // Nuevo: estado para el loading

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

    // Configurar el handler de logout
    setLogoutHandler(() => logOut());
  }, []);

  const isLogged = () => {
    return user !== null && user.response.token !== undefined;
  };

  const logOut = async () => {
    alert("You have logged out.");
    await new Promise((resolve) => setTimeout(resolve, 800));
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
    console.log("1. Handling Google login in context:", {
      ...googleData,
      token: "REDACTED",
    });

    const formattedResponse: LoginResponse = {
      success: "success",
      response: {
        token: googleData.token,
        user: googleData.user,
      },
      user: googleData.user,
    };

    console.log("2. Setting formatted user data in context");
    setUser(formattedResponse);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        logOut,
        updateUser,
        handleGoogleLogin,
        loading, // Nuevo: se expone loading en el contexto
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

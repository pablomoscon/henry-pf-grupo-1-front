"use client";
import { LoginResponse, UserData } from "@/interfaces/IUser";
import { useState, createContext, useEffect } from "react";

interface UserContextProps {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
  isLogged: () => boolean;
  logOut: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  handleGoogleLogin: (googleData: { token: string; user: UserData }) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLogged: () => false,
  logOut: () => {},
  updateUser: () => {},
  handleGoogleLogin: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    setUser(localUser ? JSON.parse(localUser) : null);
  }, []);

  const isLogged = () => {
    return user !== null && user.response.token !== undefined;
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("You have logged out.");
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
      value={{ user, setUser, isLogged, logOut, updateUser, handleGoogleLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

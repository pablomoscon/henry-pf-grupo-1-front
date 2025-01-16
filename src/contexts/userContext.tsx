"use client";
import { LoginResponse } from "@/interfaces/IUser";
import { useState, createContext, useEffect } from "react";

interface UserContextProps {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
  isLogged: () => boolean;
  logOut: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLogged: () => false,
  logOut: () => {},
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
    return user !== null && user.token !== undefined;
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("You have logged out.");
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

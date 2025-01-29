"use client";
import React, { createContext, useContext, useState } from "react";

interface NavigationGuardContextType {
  allowAccessToPage: (page: string) => void;
  isAccessAllowed: (page: string) => boolean;
}

const NavigationGuardContext = createContext<
  NavigationGuardContextType | undefined
>(undefined);

export const NavigationGuardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [allowedPages, setAllowedPages] = useState<Record<string, boolean>>({});

  const allowAccessToPage = (page: string) => {
    setAllowedPages((prev) => ({ ...prev, [page]: true }));
  };

  const isAccessAllowed = (page: string) => !!allowedPages[page];

  return (
    <NavigationGuardContext.Provider
      value={{ allowAccessToPage, isAccessAllowed }}
    >
      {children}
    </NavigationGuardContext.Provider>
  );
};

export const useNavigationGuard = () => {
  const context = useContext(NavigationGuardContext);
  if (!context) {
    throw new Error(
      "useNavigationGuard debe usarse dentro de un NavigationGuardProvider"
    );
  }
  return context;
};

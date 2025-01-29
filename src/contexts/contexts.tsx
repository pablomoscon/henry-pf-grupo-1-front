"use client";

import UserProvider from "./userContext";
import { DateProvider } from "./dateContext";
import { NavigationGuardProvider } from "./navigationGuardContext";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <DateProvider>
        <NavigationGuardProvider>{children}</NavigationGuardProvider>
      </DateProvider>
    </UserProvider>
  );
};

export default Contexts;

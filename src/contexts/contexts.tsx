"use client";

import UserProvider from "./userContext";
import { DateProvider } from "./dateContext";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <DateProvider>{children}</DateProvider>
    </UserProvider>
  );
};

export default Contexts;

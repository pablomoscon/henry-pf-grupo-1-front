"use client";
import UserProvider from "./userContext";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Contexts;

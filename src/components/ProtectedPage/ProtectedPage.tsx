"use client";

import { useEffect, useState } from "react";
import { useNavigationGuard } from "@/contexts/navigationGuardContext";
import Page404 from "../Page404/Page404";

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredPage: string;
}

const ProtectedPage = ({ children, requiredPage }: ProtectedPageProps) => {
  const { isAccessAllowed } = useNavigationGuard();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const access = isAccessAllowed(requiredPage);
    setIsAllowed(access);
  }, [isAccessAllowed, requiredPage]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  return isAllowed ? children : <Page404 />;
};

export default ProtectedPage;

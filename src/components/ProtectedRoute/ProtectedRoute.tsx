"use client";

import React, { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import { protectedPaths } from "@/helpers/protectedPaths";
import Page404 from "../Page404/Page404";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();
  const [alertShown, setAlertShown] = useState(false);

  const rolesForPath = protectedPaths[pathname];

  if (
    rolesForPath &&
    (!user || !rolesForPath.includes(user.response.user.role))
  ) {
    if (!alertShown) {
      setAlertShown(true);
      if (typeof window !== "undefined") {
        alert("You don't have permission to be here.");
      }
    }
    return <Page404 />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

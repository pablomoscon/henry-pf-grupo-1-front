"use client";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Page404 from "@/components/Page404/Page404";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (!user || !user.response.user) {
      setIsAuthorized(false);
    }
  }, [user]);

  if (!isAuthorized) {
    return <Page404 />;
  }

  return <>{children}</>;
};

export default AuthGuard;

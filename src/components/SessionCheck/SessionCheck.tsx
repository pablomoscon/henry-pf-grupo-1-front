"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";

const SessionCheck = () => {
  const { checkTokenExpiration } = useContext(UserContext);

  useEffect(() => {
    // Check immediately on mount
    checkTokenExpiration();

    // Then check every minute
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  return null;
};

export default SessionCheck;

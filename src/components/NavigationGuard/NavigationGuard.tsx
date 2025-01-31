"use client";

import { useEffect, useState } from "react";

import Page404 from "@/components/Page404/Page404";

interface NavigationGuardProps {
  children: React.ReactNode;
  originPath: string; // ruta desde donde debe venir el usuario
}

const NavigationGuard = ({ children, originPath }: NavigationGuardProps) => {
  const [isValidNavigation, setIsValidNavigation] = useState(false);

  useEffect(() => {
    // Verificar si el usuario viene de la ruta correcta
    const referrer = document.referrer;
    const isValidOrigin = referrer.includes(originPath);

    setIsValidNavigation(isValidOrigin);
  }, [originPath]);

  if (!isValidNavigation) {
    return <Page404 />;
  }

  return <>{children}</>;
};

export default NavigationGuard;

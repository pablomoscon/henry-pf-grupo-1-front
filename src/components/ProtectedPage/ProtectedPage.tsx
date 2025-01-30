"use client";

import { useAccess } from "@/contexts/accessContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const withAccess = (WrappedComponent: React.FC) => {
  const ProtectedComponent = () => {
    const { hasAccess } = useAccess();
    const router = useRouter();
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
      const path = router.pathname;

      if (!hasAccess(path)) {
        router.replace("/"); // Redirige si no tienes acceso
      } else {
        setCanRender(true); // Permite renderizar el componente
      }
    }, [hasAccess, router]);

    // Mientras verifica el acceso, puedes mostrar un estado de carga o simplemente null
    if (!canRender) return null;

    return <WrappedComponent />;
  };

  return ProtectedComponent;
};

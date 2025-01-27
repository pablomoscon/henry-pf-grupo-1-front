"use client";

import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[]; // Define los roles que pueden acceder a esta ruta
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, isLogged } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está logueado
    if (!isLogged()) {
      router.push("/login");
      return;
    }

    // Verificar si el rol del usuario está permitido
    const userRole = user?.response.user.role; // Accedemos al rol correctamente
    if (roles && !roles.includes(userRole!)) {
      alert("No tienes permisos para acceder a esta página.");
      router.push("/");
    }
  }, [isLogged, roles, router, user]);

  return <>{children}</>;
};

export default ProtectedRoute;

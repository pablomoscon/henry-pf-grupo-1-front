"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserWidget = () => {
  const { isLogged, user, logOut } = useContext(UserContext);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user?.response.user.role) {
      setRole(user.response.user.role);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role);
      }
    }
  }, [user]);

  const handleLogout = () => {
    logOut();
    localStorage.removeItem("user");
    router.push("/");
  };

  const renderRoleBasedLink = () => {
    if (role === "admin") {
      return (
        <Link
          href="/dashadmin"
          className="flex items-center hover:text-gold-dark transition-colors"
        >
          <Image
            src="/PerfilIcono.png"
            alt="Dashboard Icon"
            width={16}
            height={16}
            className="mr-2"
          />
          Dashboard
        </Link>
      );
    } else if (role === "user") {
      return (
        <Link
          href="/profile"
          className="flex items-center hover:text-gold-dark transition-colors"
        >
          <Image
            src="/PerfilIcono.png"
            alt="Profile Icon"
            width={16}
            height={16}
            className="mr-2"
          />
          Profile
        </Link>
      );
    }
    return null; // Por si el rol no está definido
  };

  return (
    <div className="flex items-center gap-4 text-xs font-semibold text-black-dark">
      {isLogged() ? (
        <>
          {renderRoleBasedLink()}
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-gold-dark transition-colors"
          >
            <Image
              src="/LogoutIcon.png"
              alt="Logout Icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="flex items-center hover:text-gold-dark transition-colors"
        >
          <Image
            src="/PerfilIcono.png"
            alt="Sign In Icon"
            width={16}
            height={16}
            className="mr-2"
          />
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserWidget;

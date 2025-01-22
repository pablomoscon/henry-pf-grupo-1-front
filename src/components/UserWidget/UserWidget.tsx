"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserWidget = () => {
  const { isLogged, logOut } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logOut();
    router.push("/");
  };

  return (
    <div className="flex items-center gap-4 text-xs font-semibold text-black-dark">
      {isLogged() ? (
        <>
          <Link
            href="/dashboard"
            className="flex items-center hover:text-gold-dark transition-colors"
          >
            <Image
              src="/PerfilIcono.png"
              alt="User Icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Dashboard
          </Link>
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

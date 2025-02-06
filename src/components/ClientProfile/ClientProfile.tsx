"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import Link from "next/link";

const ClientProfile = () => {
  const { user } = useContext(UserContext);
  const userData = user?.response?.user;

  return (
    <>
      <h1 className="text-4xl text-center text-gold-soft mb-6">
        Welcome to your Profile
      </h1>

      <div>
        <h2 className="text-2xl text-gold-soft mb-4 flex items-center gap-2">
          <span className="text-2xl"></span>
          My Profile
        </h2>
        <div className="bg-black-dark p-6 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">DNI</span>
                <span className="text-white-ivory text-lg font-medium">
                  {userData?.customerId || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">
                  Full Name
                </span>
                <span className="text-white-ivory text-lg font-medium">
                  {userData?.name || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">Email</span>
                <span className="text-white-ivory text-lg font-medium">
                  {userData?.email || "-"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">
                  Phone Number
                </span>
                <span className="text-white-ivory text-lg font-medium">
                  {userData?.phone || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">Address</span>
                <span className="text-white-ivory text-lg font-medium">
                  {userData?.address || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">
                  Member Since
                </span>
                <span className="text-white-ivory text-lg font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gold-soft/10">
            <Link
              href="/edit-profile"
              className="text-gold-soft/70 text-sm hover:text-gold-soft transition-colors flex items-center gap-2"
            >
              <span>Edit Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfile;

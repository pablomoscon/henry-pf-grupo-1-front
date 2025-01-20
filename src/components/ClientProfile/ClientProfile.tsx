"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ICat } from "@/interfaces/ICat";

const ClientProfile = () => {
  const { user, isLogged } = useContext(UserContext);
  const [cats, setCats] = useState<ICat[]>([]);
  const userData = user?.response?.user;

  useEffect(() => {
    const storedCats = JSON.parse(localStorage.getItem("cats") || "[]");
    setCats(storedCats);
  }, []);

  console.log("Entire user object:", user);
  console.log("User data:", user?.response?.user);

  if (!isLogged()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center text-gold-soft mb-12">
          Please log in to view your dashboard
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center text-gold-soft mb-12">
        Welcome to your Dashboard
      </h1>

      {/* My Profile Section */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold-soft mb-6 flex items-center gap-2">
          <span className="text-2xl"></span>
          My Profile
        </h2>
        <div className="bg-black-dark p-8 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm text-gold-soft/70 mb-1">
                  Customer ID
                </span>
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
          <div className="mt-6 pt-6 border-t border-gold-soft/10">
            <button className="text-gold-soft/70 text-sm hover:text-gold-soft transition-colors flex items-center gap-2">
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
            </button>
          </div>
        </div>
      </div>

      {/* My Cats Section */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold-soft mb-6 flex items-center gap-2">
          <span className="text-2xl"></span>
          My Cats
        </h2>
        <div className="bg-black-dark p-8 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
          {cats.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cats.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 border border-gray-600 rounded-lg hover:border-gold-soft/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      {cat.photo ? (
                        <img
                          src={cat.photo}
                          alt={cat.name}
                          className="w-20 h-20 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-2xl">🐱</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-gold-soft text-lg font-medium">
                          {cat.name}
                        </h3>
                        <p className="text-white-ivory">
                          Born: {new Date(cat.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-white-ivory">
                          Weight: {cat.weight} kg
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gold-soft/10">
                <Link
                  href="/new-cat"
                  className="text-gold-soft/70 text-sm hover:text-gold-soft transition-colors flex items-center gap-2"
                >
                  <span>Add More Cats</span>
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-white-ivory mb-6">
                You have not registered any cats yet.
              </p>
              <Link href="/new-cat" className="button_green inline-block">
                Add Cat
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* My Reservations Section */}
      <div>
        <h2 className="text-2xl text-gold-soft mb-6">My Reservations</h2>
        <div className="bg-black-dark p-6 rounded-lg shadow-md">
          <p className="text-white-ivory text-center">
            You do not have any reservations yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;

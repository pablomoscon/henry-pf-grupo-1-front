"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ICatGet, ICat } from "@/interfaces/ICat";
import EditCatModal from "../EditCatModal/EditCatModal";
import { updateCat, getCats } from "@/services/catServices";
import { getUserReservations } from "@/services/bookService";
import { IReservation } from "@/interfaces/IReserve";

const ClientProfile = () => {
  const { user, isLogged, handleGoogleLogin } = useContext(UserContext);
  const [cats, setCats] = useState<ICatGet[]>([]);
  const userData = user?.response?.user;
  const [selectedCat, setSelectedCat] = useState<ICat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth="));

        if (!authCookie) return;

        const { token, user } = JSON.parse(
          decodeURIComponent(authCookie.split("=")[1])
        );

        if (!token || !user?.id) return;

        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok)
          throw new Error(`Error fetching user: ${response.statusText}`);

        const userProfile = await response.json();

        handleGoogleLogin({ token, user: userProfile });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!isLogged()) {
      fetchUserProfile();
    }
  }, [isLogged, handleGoogleLogin]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const userId = user?.response?.user?.id;

        if (!userId) {
          console.warn("User ID not available yet");
          return;
        }

        const catsData = await getCats();
        const userCats = catsData.filter((cat) => cat.user?.id === userId);
        setCats(userCats);
      } catch (error) {
        console.error("Error fetching cats:", error);
        alert("Failed to load cats. Please try again.");
      }
    };

    if (user?.response?.user?.id) {
      fetchCats();
    }
  }, [user?.response?.user?.id]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = user?.response?.user?.id;
        if (!userId) {
          console.warn("User ID not available yet");
          return;
        }

        const userReservations = await getUserReservations(userId);
        setReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        alert("Failed to load reservations. Please try again.");
      }
    };

    if (user?.response?.user?.id) {
      fetchReservations();
    }
  }, [user?.response?.user?.id]);

  const handleEditCat = (cat: ICat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const handleSaveCat = async (updatedCat: ICat) => {
    try {
      await updateCat(updatedCat, updatedCat.id);
      const updatedCats = cats.map((cat) =>
        cat.id === updatedCat.id ? updatedCat : cat
      );
      setCats(updatedCats);
      setIsModalOpen(false);
      setSelectedCat(null);
    } catch (error) {
      console.error("Error updating cat:", error);
      alert("Failed to update cat. Please try again.");
    }
  };

  if (!isLogged()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center text-gold-soft mb-12">
          Checking authentication...
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center text-gold-soft mb-12">
        Welcome to your Profile
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
          <div className="mt-6 pt-6 border-t border-gold-soft/10">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {cat.photo instanceof File && cat.photo.size > 0 ? (
                          <div className="relative w-20 h-20">
                            <Image
                              src={URL.createObjectURL(cat.photo)}
                              alt={cat.name}
                              fill
                              sizes="80px"
                              className="object-cover rounded-full"
                              priority
                            />
                          </div>
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
                            Born:{" "}
                            {new Date(cat.dateOfBirth).toLocaleDateString()}
                          </p>
                          <p className="text-white-ivory">
                            Weight: {cat.weight} kg
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditCat(cat)}
                        className="text-gold-soft/70 hover:text-gold-soft transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
        <div className="bg-black-dark p-8 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
          {reservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="p-4 border border-gray-600 rounded-lg hover:border-gold-soft/50 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <h3 className="text-gold-soft text-lg font-medium">
                      Suite: {reservation.room?.name || "N/A"}
                    </h3>
                    <p className="text-white-ivory">
                      Check-in:{" "}
                      {new Date(reservation.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-white-ivory">
                      Check-out:{" "}
                      {new Date(reservation.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-white-ivory">
                      Total Amount: ${reservation.totalAmount}
                    </p>
                    <p className="text-white-ivory">
                      Status: {reservation.status || "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white-ivory text-center">
              You do not have any reservations yet.
            </p>
          )}
        </div>
      </div>

      {/* Edit Cat Modal */}
      {selectedCat && (
        <EditCatModal
          cat={selectedCat}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCat(null);
          }}
          onSave={handleSaveCat}
        />
      )}
    </div>
  );
};

export default ClientProfile;

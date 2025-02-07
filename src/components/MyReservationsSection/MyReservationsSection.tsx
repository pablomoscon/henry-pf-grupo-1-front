"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { IReservation } from "@/interfaces/IReserve";
import { getUserReservations } from "@/services/bookService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const MyReservationsSection = () => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const token = user?.response?.token;
  const userData = user?.response?.user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = userData?.id;
        if (!userId) return;

        const userReservations = await getUserReservations(userId, token);
        setReservations(userReservations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if (userData?.id) {
      fetchReservations();
    }
  }, [userData?.id, token]);

  return (
    <>
      <h2 className="text-2xl text-gold-soft mb-4">My Reservations</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-black-dark p-6 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
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
      )}
    </>
  );
};

"use client";

import { useState, useEffect, useContext } from "react";
import { IReservation } from "@/interfaces/IReserve";
import { reservationService } from "@/services/reservationServices";
import { ReservationsTable } from "../ReservationsStatsTable/ReservationsStatsTable";
import { UserContext } from "@/contexts/userContext";

const ReservationsManager = () => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await reservationService.getReservations(
          user?.response?.token
        );
        setReservations(data);
      } catch (error) {
        console.error("Error loading reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user?.response?.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 bg-black-dark">
      <div className="w-full max-w-5xl mx-auto pt-2 p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Reservations Management
        </h2>

        <ReservationsTable reservations={reservations} />
      </div>
    </div>
  );
};

export default ReservationsManager;

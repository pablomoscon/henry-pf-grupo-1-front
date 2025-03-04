"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import { ReservationsTable } from "@/components/ReservationsTable/ReservationsTable";
import { reservationService } from "@/services/editReservationServices";
import { IReservationEdit } from "@/interfaces/IReserve";
import { UserContext } from "@/contexts/userContext";
import { EditReservationModal } from "@/components/EditReservationModal/EditReservationModal";

export const EditReservationManager = () => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservationEdit[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<IReservationEdit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReservations = useCallback(async () => {
    if (!user?.response?.token) {
      return;
    }
    try {
      const data = await reservationService.getReservations(
        user.response.token
      );
      if (data) {
        setReservations(data);
      }
    } catch (error) {
      console.error("Error getting reservations", error);
    }
  }, [user?.response?.token]);

  useEffect(() => {
    if (user?.response?.token) {
      fetchReservations();
    }
  }, [user?.response?.token, fetchReservations]);

  const handleSave = async (updatedReservation: IReservationEdit) => {
    try {
      const caretakerId =
        updatedReservation.caretakers &&
        updatedReservation.caretakers.length > 0
          ? updatedReservation.caretakers[0].id
          : "";

      await reservationService.updateReservation(
        updatedReservation.id,
        { caretakerId },
        user?.response?.token
      );
      await fetchReservations();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating reservation", error);
      alert("Error updating reservation. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (user?.response?.token)
      try {
        await reservationService.deleteReservation(id, user.response.token);
        await fetchReservations();
      } catch (error) {
        console.error("Error deleting reservation", error);
        alert("Error deleting reservation. Please try again.");
      }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl mb-6" style={{ color: "var(--gold-soft)" }}>
        Edit Reservations
      </h2>
      <div className="bg-black-dark rounded-lg shadow-md">
        <ReservationsTable
          reservations={reservations}
          onEdit={(reservation) => {
            setSelectedReservation(reservation);
            setIsModalOpen(true);
          }}
          onDelete={(id) => {
            handleDelete(id);
          }}
        />
        <EditReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          reservation={selectedReservation}
        />
      </div>
    </div>
  );
};

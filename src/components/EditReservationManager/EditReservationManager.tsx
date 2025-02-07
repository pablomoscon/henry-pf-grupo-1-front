"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { IReservationEdit } from "@/interfaces/IReserve";
import { reservationService } from "@/services/editReservationServices";
import { UserContext } from "@/contexts/userContext";
import { ReservationsTable } from "@/components/ReservationsTable/ReservationsTable";
import { EditReservationForm } from "../editReservationForm/editReservationForm";

export const EditReservationManager = () => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservationEdit[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<IReservationEdit | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
    } catch {
      alert("Error fetching reservation. Please try again.");
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
    } catch {
      alert("Error updating reservation. Please try again.");
    }
  };

  const handleEdit = (reservation: IReservationEdit) => {
    setSelectedReservation(reservation);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (user?.response?.token)
      try {
        await reservationService.deleteReservation(id, user.response.token);
        await fetchReservations();
      } catch {
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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSave={handleSave}
        />
        {isEditOpen && (
          <EditReservationForm
            reservation={selectedReservation}
            onClose={() => setIsEditOpen(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

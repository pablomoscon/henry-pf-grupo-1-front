"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { IReservationEdit } from "@/interfaces/IReserve";
import { reservationService } from "@/services/editReservationServices";
import { UserContext } from "@/contexts/userContext";
import { ReservationsTable } from "@/components/ReservationsTable/ReservationsTable";
import { EditReservationForm } from "../editReservationForm/editReservationForm";
import RemoveCaretakerForm from "../RemoveCaretakerForm/RemoveCaretakerForm";

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
      console.log(user?.response?.token);
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
    } catch (error) {
      console.error("Error updating reservation", error);
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
      } catch (error) {
        console.error("Error deleting reservation", error);
        alert("Error deleting reservation. Please try again.");
      }
  };

  const handleRemoveCaretaker = async (
    updatedReservation: IReservationEdit
  ) => {
    debugger;
    console.log(
      "handleRemoveCaretaker llamado con parámetros:",
      updatedReservation
    );
    try {
      console.log(user?.response?.token);
      const caretakerId =
        updatedReservation.caretakers &&
        updatedReservation.caretakers.length > 0
          ? updatedReservation.caretakers[0].id
          : "";

      console.log("caretakerId:", caretakerId);
      console.log("updatedReservation.id:", updatedReservation.id);

      console.log("Llamando a reservationService.removeCaretaker...");
      await reservationService.removeCaretaker(
        updatedReservation.id,
        { caretakerId },
        user?.response?.token
      );
      console.log("removeCaretaker llamado correctamente");

      await fetchReservations();
    } catch (error) {
      console.error("Error updating reservation", error);
      alert("Error updating reservation. Please try again.");
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
        {isEditOpen && (
          <RemoveCaretakerForm
            reservation={selectedReservation}
            onClose={() => setIsEditOpen(false)}
            onRemove={handleRemoveCaretaker}
          />
        )}
      </div>
    </div>
  );
};

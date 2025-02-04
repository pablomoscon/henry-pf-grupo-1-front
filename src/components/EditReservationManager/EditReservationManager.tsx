"use client";

import { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.response?.token) {
        console.log("No hay token disponible");
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
        console.error("Error al obtener reservaciones:", error);
      }
    };

    if (user?.response?.token) {
      fetchReservations();
    }
  }, [user?.response?.token]);

  const handleSave = async (updatedReservation: IReservationEdit) => {
    try {
      await reservationService.updateReservation(
        updatedReservation.id,
        {
          caretakerId: updatedReservation.caretakers[0] || "",
        },
        user?.response?.token
      );

      const updatedReservations = reservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res
      );
      setReservations(updatedReservations);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      alert("Error al actualizar la reserva. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-7xl mx-auto p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Edit Reservations
        </h2>
        <ReservationsTable
          reservations={reservations}
          onEdit={(reservation) => {
            setSelectedReservation(reservation);
            setIsModalOpen(true);
          }}
          onDelete={(id) => {
            console.log("Delete:", id);
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

"use client";

import { ReservationsTable } from "@/components/ReservationsTable/ReservationsTable";
import { useState, useEffect, useContext } from "react";
import { reservationService } from "@/services/editReservationServices";
import { IReservation } from "@/interfaces/IReserve";
import { UserContext } from "@/contexts/userContext";
import { EditReservationModal } from "@/components/EditReservationModal/EditReservationModal";
import { UserData } from "@/interfaces/IUser";

export default function EditReservation() {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<IReservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caretakers, setCaretakers] = useState<UserData[]>([]);

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
        console.error("Error detallado al obtener reservaciones:", error);
        if (error instanceof Error) {
          console.error("Mensaje de error:", error.message);
        }
      }
    };

    if (user?.response?.token) {
      fetchReservations();
    }
  }, [user?.response?.token]);

  useEffect(() => {
    const fetchCaretakers = async () => {
      if (!user?.response?.token) {
        return;
      }

      try {
        const data = await reservationService.getCaretakers(
          user.response.token
        );
        setCaretakers(data);
      } catch (error) {
        console.error("Error fetching caretakers:", error);
      }
    };

    fetchCaretakers();
  }, [user?.response?.token]);

  const handleSave = async (updatedReservation: IReservation) => {
    try {
      await reservationService.updateReservation(
        updatedReservation.id,
        {
          reservationId: updatedReservation.id,
          caretakerId: updatedReservation.caretaker?.id || "",
        },
        user?.response?.token
      );

      const updatedReservations = reservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res
      );
      setReservations(updatedReservations);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error completo:", error);
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
            // Implementar lógica de eliminación
            console.log("Delete:", id);
          }}
        />
        <EditReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          reservation={selectedReservation}
          caretakers={caretakers}
        />
      </div>
    </div>
  );
}

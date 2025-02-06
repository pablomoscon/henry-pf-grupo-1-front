"use client";

import React, { useState } from "react";
import { IReservationEdit } from "@/interfaces/IReserve";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DeleteModal } from "../DeleteModal/DeleteModal";

interface ReservationsTableProps {
  reservations: IReservationEdit[];
  onEdit: (reservation: IReservationEdit) => void;
  onDelete: (id: string) => void;
}

export function ReservationsTable({
  reservations,
  onEdit,
  onDelete,
}: ReservationsTableProps) {
  const [selectedReservation, setSelectedReservation] =
    useState<IReservationEdit | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (reservation: IReservationEdit) => {
    onEdit(reservation);
    setSelectedReservation(reservation);
  };

  const handleDelete = async (reservationToDelete: IReservationEdit) => {
    setIsDeleteModalOpen(true);
    setSelectedReservation(reservationToDelete);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(selectedReservation?.id || "");
      setIsDeleteModalOpen(false);
      alert("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert("Error deleting reservation");
    }
  };
  return (
    <div className="w-full rounded-lg border border-gray-700 bg-black-dark">
      <div className="p-4">
        {/* <input
          type="text"
          placeholder="Search by ID, check-in or check-out..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
        /> */}
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gray-700 bg-black-light">
            <th className="w-[8%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">ID</div>
            </th>
            <th className="w-[12%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Suite</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Customer</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Cats</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Caretaker</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Check-in</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Check-out</div>
            </th>
            <th className="w-[7%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Total</div>
            </th>
            <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Status</div>
            </th>
            <th className="w-[8%] px-2 py-3 text-xs font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr
              key={reservation.id}
              className="border-b border-gray-700 transition-colors hover:bg-black-light/50"
            >
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.id}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.roomName}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.userName}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.cats}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.caretakers && reservation.caretakers.length > 0
                    ? reservation.caretakers[0].name
                    : "Unassigned"}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.checkIn}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.checkOut}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.totalAmount}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.status}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                <button
                  onClick={() => handleEdit(reservation)}
                  className="text-gold-soft transition-colors hover:text-gold-hover mr-3"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(reservation)}
                  className="text-red-500 transition-colors hover:text-red-600"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this reservation?"
        />
      )}
    </div>
  );
}

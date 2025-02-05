"use client";

import { IReservationEdit } from "@/interfaces/IReserve";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useMemo } from "react";
import { EditReservationModal } from "../EditReservationModal/EditReservationModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [filterField, setFilterField] = useState("id");
  const [filterText, setFilterText] = useState("");

  const handleEdit = (reservation: IReservationEdit) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedReservation: IReservationEdit) => {
    onEdit(updatedReservation);
    setIsModalOpen(false);
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      if (dateRange.startDate || dateRange.endDate) {
        const checkInDate = new Date(reservation.checkIn);
        const startDate = dateRange.startDate
          ? new Date(dateRange.startDate + "T00:00:00")
          : null;
        const endDate = dateRange.endDate
          ? new Date(dateRange.endDate + "T23:59:59")
          : null;

        if (startDate && endDate) {
          if (!(checkInDate >= startDate && checkInDate <= endDate))
            return false;
        } else if (startDate) {
          if (!(checkInDate >= startDate)) return false;
        } else if (endDate) {
          if (!(checkInDate <= endDate)) return false;
        }
      }
      if (filterText.trim() !== "") {
        let fieldValue = "";
        switch (filterField) {
          case "id":
            fieldValue = reservation.id;
            break;
          case "status":
            fieldValue = reservation.status;
            break;
          case "customer":
            fieldValue = reservation.userName;
            break;
          case "suite":
            fieldValue = reservation.roomName;
            break;
          default:
            fieldValue = "";
        }
        if (!fieldValue.toLowerCase().includes(filterText.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [
    reservations,
    dateRange.startDate,
    dateRange.endDate,
    filterField,
    filterText,
  ]);

  const handleDateRangeChange = (
    type: "startDate" | "endDate",
    value: string
  ) => {
    setIsLoading(true);
    setDateRange((prev) => ({ ...prev, [type]: value }));
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <>
      <div className="w-full max-w-4xl rounded-lg border border-gray-700 bg-black-dark">
        <div className="p-4 border-b border-gray-700 w-full flex flex-col gap-4">
          <div className="flex flex-wrap w-full gap-4">
            <div className="flex items-center gap-2 flex-1 mr-2 ml-2">
              <span className="text-gray-400 text-sm font-normal">From:</span>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  handleDateRangeChange("startDate", e.target.value)
                }
                className="p-2 w-full rounded bg-black-light text-white-ivory border border-gray-700 text-sm focus:outline-none focus:border-gold-soft transition-all duration-300"
              />
              <span className="text-gray-400 text-sm">To:</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  handleDateRangeChange("endDate", e.target.value)
                }
                min={dateRange.startDate}
                className="p-2 w-full rounded bg-black-light text-white-ivory border border-gray-700 text-sm focus:outline-none focus:border-gold-soft transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full gap-4">
            <div className="flex items-center gap-2 flex-1 ml-2 mr-2">
              <span className="text-gray-400 font-normal text-sm">By:</span>
              <select
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                className="p-2  ml-4 w-full rounded bg-black-light text-white-ivory border border-gray-700 text-sm focus:outline-none focus:border-gold-soft transition-all duration-300"
              >
                <option value="id">ID</option>
                <option value="status">Status</option>
                <option value="customer">Customer</option>
                <option value="suite">Suite</option>
              </select>
              <span className="text-gray-400 font-normal text-sm">For:</span>
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search..."
                className="p-2 w-full rounded bg-black-light text-white-ivory border border-gray-700 text-sm focus:outline-none focus:border-gold-soft transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div
          className={`relative transition-opacity duration-300 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black-dark/10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-soft"></div>
            </div>
          )}
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-700 bg-black-light">
                <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">ID</div>
                </th>

                <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">Suite</div>
                </th>
                <th className="w-[13%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">
                    Customer
                  </div>
                </th>
                <th className="w-[12%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">
                    Check In
                  </div>
                </th>
                <th className="w-[12%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">
                    Check Out
                  </div>
                </th>
                <th className="w-[8%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">Cats</div>
                </th>

                <th className="w-[15%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">
                    Caretaker
                  </div>
                </th>
                <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">Status</div>
                </th>

                <th className="w-[10%] px-2 py-3 text-xs font-medium text-gold-soft">
                  <div className="mx-auto max-w-full truncate px-1">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-black-dark">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-2 py-3 text-center text-sm text-white-ivory"
                  >
                    <div className="h-8"></div>
                  </td>
                </tr>
              ) : filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="transition-colors hover:bg-black-light/50"
                  >
                    <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="mx-auto max-w-full truncate px-1">
                        {reservation.id.substring(0, 6)}...
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
                        {new Date(reservation.checkIn).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="mx-auto max-w-full truncate px-1">
                        {new Date(reservation.checkOut).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="mx-auto max-w-full truncate px-1">
                        {reservation.cats.length}
                      </div>
                    </td>
                    <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="mx-auto max-w-full truncate px-1">
                        {reservation.caretakers &&
                        reservation.caretakers.length > 0
                          ? reservation.caretakers[0].name || "Unassigned"
                          : "Unassigned"}
                      </div>
                    </td>
                    <td className="truncate px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="mx-auto max-w-full truncate px-1">
                        {reservation.status}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center text-xs text-white-ivory">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(reservation)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(reservation.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-2 py-3 text-center text-sm text-white-ivory"
                  >
                    {dateRange.startDate || dateRange.endDate || filterText
                      ? "No reservations found with the selected filters"
                      : "No reservations available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EditReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        reservation={selectedReservation}
      />
    </>
  );
}

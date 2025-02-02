import { IReservation } from "@/interfaces/IReserve";
import { useState } from "react";

interface ReservationsTableProps {
  reservations: IReservation[];
}

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const [filterType, setFilterType] = useState<
    "dates" | "id" | "suite" | "status"
  >("dates");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReservations = reservations.filter((reservation) => {
    if (filterType === "dates") {
      const checkInDate = new Date(reservation.checkInDate);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo + "T23:59:59") : null;
      return (
        (!fromDate || checkInDate >= fromDate) &&
        (!toDate || checkInDate <= toDate)
      );
    }

    const term = searchTerm.toLowerCase();
    switch (filterType) {
      case "id":
        return reservation.id.toLowerCase().includes(term);
      case "suite":
        return reservation.room.name.toLowerCase().includes(term);
      case "status":
        return reservation.status.toLowerCase().includes(term);
      default:
        return true;
    }
  });

  return (
    <div className="w-full rounded-lg border border-gray-700 bg-black-dark">
      <div className="p-4">
        <div className="flex gap-4 items-center w-full">
          <div className="w-1/3">
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(
                  e.target.value as "dates" | "id" | "suite" | "status"
                );
                setSearchTerm("");
                setDateFrom("");
                setDateTo("");
              }}
              className="w-full p-2 rounded bg-white text-black border border-gray-700 focus:outline-none focus:border-gold-soft"
            >
              <option value="dates">Search by dates</option>
              <option value="id">Search by ID</option>
              <option value="suite">Search by Suite</option>
              <option value="status">Search by Status</option>
            </select>
          </div>

          {filterType === "dates" ? (
            <div className="flex gap-4 w-2/3">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-1/2 p-2 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-1/2 p-2 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
              />
            </div>
          ) : (
            <div className="w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search by ${filterType}...`}
                className="w-full p-2 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
              />
            </div>
          )}
        </div>
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gray-700 bg-black-light">
            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">ID</div>
            </th>
            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Suite</div>
            </th>
            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Check In</div>
            </th>
            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Check Out</div>
            </th>
            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Status</div>
            </th>

            <th className="w-[16.66%] px-2 py-3 text-sm font-medium text-gold-soft">
              <div className="mx-auto max-w-full truncate px-1">Amount</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredReservations.map((reservation) => (
            <tr
              key={reservation.id}
              className="border-b border-gray-700 transition-colors hover:bg-black-light/50"
            >
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.id}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.room.name}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {new Date(reservation.checkInDate).toLocaleDateString()}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {new Date(reservation.checkOutDate).toLocaleDateString()}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  {reservation.status}
                </div>
              </td>
              <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                <div className="mx-auto max-w-full truncate px-1">
                  ${reservation.totalAmount}
                </div>
              </td>
            </tr>
          ))}
          {filteredReservations.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-2 py-3 text-center text-sm text-white-ivory"
              >
                No reservations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

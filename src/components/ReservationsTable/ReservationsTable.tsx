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
      if (!dateRange.startDate && !dateRange.endDate) return true;

      const checkInDate = new Date(reservation.checkIn);
      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate + "T00:00:00")
        : null;
      const endDate = dateRange.endDate
        ? new Date(dateRange.endDate + "T23:59:59")
        : null;

      const normalizedCheckIn = new Date(
        checkInDate.toISOString().split("T")[0]
      );

      if (startDate && endDate) {
        return normalizedCheckIn >= startDate && normalizedCheckIn <= endDate;
      } else if (startDate) {
        return normalizedCheckIn >= startDate;
      } else if (endDate) {
        return normalizedCheckIn <= endDate;
      }

      return true;
    });
  }, [reservations, dateRange.startDate, dateRange.endDate]);

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
      <div className='w-full rounded-lg border border-gray-700 bg-black-dark'>
        <div className='p-4 border-b border-gray-700'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <span className='text-gold-soft font-medium whitespace-nowrap'>
                Search by Check-in:
              </span>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-400 text-sm'>From</span>
                  <input
                    type='date'
                    value={dateRange.startDate}
                    onChange={(e) =>
                      handleDateRangeChange('startDate', e.target.value)
                    }
                    className='p-2 rounded bg-black-light text-white-ivory border border-gray-700 focus:outline-none focus:border-gold-soft text-sm transition-all duration-300'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-400 text-sm'>To</span>
                  <input
                    type='date'
                    value={dateRange.endDate}
                    onChange={(e) =>
                      handleDateRangeChange('endDate', e.target.value)
                    }
                    min={dateRange.startDate}
                    className='p-2 rounded bg-black-light text-white-ivory border border-gray-700 focus:outline-none focus:border-gold-soft text-sm transition-all duration-300'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              {filteredReservations.length > 0 && (
                <span className='text-sm text-gray-400'>
                  {filteredReservations.length} reservation
                  {filteredReservations.length !== 1 ? 's' : ''}
                </span>
              )}
              {(dateRange.startDate || dateRange.endDate) && (
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setDateRange({ startDate: '', endDate: '' });
                    setTimeout(() => setIsLoading(false), 300);
                  }}
                  className='flex items-center gap-1 text-gold-soft hover:text-gold-soft/80 text-sm whitespace-nowrap transition-colors duration-300'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`relative transition-opacity duration-300 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black-dark/10'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold-soft'></div>
            </div>
          )}
          <table className='w-full table-fixed'>
            <thead>
              <tr className='border-b border-gray-700 bg-black-light'>
                <th className='w-[10%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>ID</div>
                </th>
                <th className='w-[15%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>Suite</div>
                </th>
                <th className='w-[15%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>
                    Customer
                  </div>
                </th>
                <th className='w-[15%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>
                    Check In
                  </div>
                </th>
                <th className='w-[15%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>
                    Check Out
                  </div>
                </th>
                <th className='w-[5%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>Cats</div>
                </th>
                <th className='w-[15%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>
                    Caretaker
                  </div>
                </th>
                <th className='w-[10%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>Status</div>
                </th>
                <th className='w-[10%] px-2 py-3 text-sm font-medium text-gold-soft'>
                  <div className='mx-auto max-w-full truncate px-1'>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700 bg-black-dark'>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className='px-2 py-3 text-center text-sm text-white-ivory'
                  >
                    <div className='h-8'></div>
                  </td>
                </tr>
              ) : filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className='transition-colors hover:bg-black-light/50'
                  >
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {reservation.id.substring(0, 6)}...
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {reservation.roomName}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {reservation.userName}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {new Date(reservation.checkIn).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {new Date(reservation.checkOut).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {reservation.cats.length}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {/* Verificamos si caretakers está definido y tiene elementos */}
                        {reservation.caretakers &&
                        reservation.caretakers.length > 0
                          ? reservation.caretakers[0].name || 'Unassigned'
                          : 'Unassigned'}
                      </div>
                    </td>
                    <td className='truncate px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='mx-auto max-w-full truncate px-1'>
                        {reservation.status}
                      </div>
                    </td>
                    <td className='px-2 py-3 text-center text-sm text-white-ivory'>
                      <div className='flex justify-center space-x-2'>
                        <button
                          onClick={() => handleEdit(reservation)}
                          className='text-blue-400 hover:text-blue-300 transition-colors'
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(reservation.id)}
                          className='text-red-400 hover:text-red-300 transition-colors'
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
                    className='px-2 py-3 text-center text-sm text-white-ivory'
                  >
                    {dateRange.startDate || dateRange.endDate
                      ? 'No reservations found in the selected date range'
                      : 'No reservations available'}
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

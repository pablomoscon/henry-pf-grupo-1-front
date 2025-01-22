import React from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  checkInDate,
  checkOutDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black-dark p-6 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-xl font-semibold mb-4">Confirm Reservation</h2>
        <p>Check-in Date: {checkInDate}</p>
        <p>Check-out Date: {checkOutDate}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)} USD</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-black-dark rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-olive text-black-dark rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;

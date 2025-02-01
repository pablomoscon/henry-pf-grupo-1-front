import { UserData } from "@/interfaces/IUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { EditCaretakerModal } from "../EditCaretakerModal/EditCaretakerModal";

interface CaretakersTableProps {
  caretakers: UserData[];
  updateCaretaker: (caretaker: UserData) => void;
  onDelete: (caretaker: UserData) => void;
}

export const CaretakersTable = ({
  caretakers,
  updateCaretaker,
  onDelete,
}: CaretakersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaretaker, setSelectedCaretaker] = useState<UserData | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleEdit = (caretaker: UserData) => {
    setSelectedCaretaker(caretaker);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedCaretaker(null);
  };

  const handleUpdate = (updatedCaretaker: UserData) => {
    updateCaretaker(updatedCaretaker);
  };

  const filteredCaretakers = caretakers.filter(
    (caretaker) =>
      caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caretaker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caretaker.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full rounded-lg border border-gray-700 bg-black-dark">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gold-soft"
          />
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700 bg-black-light">
              <th className="w-[15%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">Email</div>
              </th>
              <th className="w-[20%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">
                  Full Name
                </div>
              </th>
              <th className="w-[15%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">Phone</div>
              </th>
              <th className="w-[20%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">Address</div>
              </th>
              <th className="w-[15%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">
                  Customer ID
                </div>
              </th>
              <th className="w-[15%] px-2 py-3 text-sm font-medium text-gold-soft">
                <div className="mx-auto max-w-full truncate px-1">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCaretakers.map((caretaker) => (
              <tr
                key={caretaker.id}
                className="border-b border-gray-700 transition-colors hover:bg-black-light/50"
              >
                <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate px-1">
                    {caretaker.email}
                  </div>
                </td>
                <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate px-1">
                    {caretaker.name}
                  </div>
                </td>
                <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate px-1">
                    {caretaker.phone}
                  </div>
                </td>
                <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate px-1">
                    {caretaker.address}
                  </div>
                </td>
                <td className="truncate px-2 py-3 text-center text-sm text-white-ivory">
                  <div className="mx-auto max-w-full truncate px-1">
                    {caretaker.customerId}
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(caretaker)}
                      className="text-gold-soft transition-colors hover:text-gold-hover"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCaretaker(caretaker);
                        setShowConfirmDelete(true);
                      }}
                      className="text-red-500 transition-colors hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCaretakers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-2 py-3 text-center text-sm text-white-ivory"
                >
                  No caretakers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditCaretakerModal
        caretaker={selectedCaretaker}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />

      {showConfirmDelete && selectedCaretaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black-dark rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg text-gold-soft mb-4">Confirm Deletion</h3>
            <p className="text-white-ivory mb-6">
              Are you sure you want to delete the caretaker &ldquo;
              {selectedCaretaker.name}&rdquo;?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  onDelete(selectedCaretaker);
                  setShowConfirmDelete(false);
                }}
                className="button_gold py-2 px-4 rounded text-base"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80 text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

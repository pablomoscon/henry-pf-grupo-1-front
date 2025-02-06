import { UserData } from "@/interfaces/IUser";
import { FormEvent, useState, useEffect } from "react";

interface EditCaretakerModalProps {
  caretaker: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (caretaker: UserData) => void;
}

export const EditCaretakerModal = ({
  caretaker,
  isOpen,
  onClose,
  onUpdate,
}: EditCaretakerModalProps) => {
  const [currentCaretaker, setCurrentCaretaker] = useState<UserData | null>(
    caretaker
  );
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setCurrentCaretaker(caretaker);
  }, [caretaker]);

  if (!isOpen || !caretaker || !currentCaretaker) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmUpdate = () => {
    onUpdate(currentCaretaker);
    setShowConfirm(false);
    onClose();
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setCurrentCaretaker((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4 mt-24">
      <div className="bg-black-dark rounded-lg shadow-lg max-w-2xl w-full my-4">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl text-gold-soft">Edit Caretaker</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-white-ivory">
                Email
              </label>
              <input
                type="email"
                value={currentCaretaker.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-md border p-1.5 border-gray-600 bg-black-light text-white-basic focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white-ivory">
                Name
              </label>
              <input
                type="text"
                value={currentCaretaker.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-md border p-1.5 border-gray-600 bg-black-light text-white-basic focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white-ivory">
                Phone
              </label>
              <input
                type="tel"
                value={currentCaretaker.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-md border p-1.5 border-gray-600 bg-black-light text-white-basic focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white-ivory">
                Customer ID
              </label>
              <input
                type="text"
                value={currentCaretaker.customerId}
                onChange={(e) => handleChange("customerId", e.target.value)}
                className="w-full rounded-md border p-1.5 border-gray-600 bg-black-light text-white-basic focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1 text-white-ivory">
                Address
              </label>
              <input
                type="text"
                value={currentCaretaker.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full rounded-md border p-1.5 border-gray-600 bg-black-light text-white-basic focus:outline-none focus:ring-1"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="button_gold py-2 px-4 rounded text-base"
            >
              Update Caretaker
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80 text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black-dark rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg text-gold-soft mb-4">Confirm Update</h3>
            <p className="text-white-ivory mb-6">
              Are you sure you want to update this caretaker?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleConfirmUpdate}
                className="button_gold py-2 px-4 rounded text-base"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-black-light text-white-ivory px-4 py-2 rounded hover:bg-opacity-80 text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

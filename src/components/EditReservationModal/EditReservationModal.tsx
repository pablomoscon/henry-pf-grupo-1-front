import { useState, useEffect } from "react";
import { IReservation } from "@/interfaces/IReserve";
import { UserData } from "@/interfaces/IUser";

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedReservation: IReservation) => void;
  reservation: IReservation | null;
  caretakers: UserData[];
}

interface Caretaker extends UserData {
  user?: {
    name: string;
  };
}

export function EditReservationModal({
  isOpen,
  onClose,
  onSave,
  reservation,
  caretakers,
}: EditReservationModalProps) {
  const [formData, setFormData] = useState({
    caretakerId: "",
  });

  useEffect(() => {
    if (reservation) {
      setFormData({
        caretakerId: reservation.caretaker?.id || "",
      });
    }
  }, [reservation]);

  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black-light p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl text-gold-soft mb-4">Assign Caretaker</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white-ivory mb-2">
              Assigned Caretaker
            </label>
            <select
              value={formData.caretakerId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  caretakerId: e.target.value,
                }))
              }
              className="w-full p-2 rounded bg-black-dark text-white-ivory border border-gray-700"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f5f5" }}
            >
              <option
                value=""
                style={{ backgroundColor: "#1a1a1a", color: "#f5f5f5" }}
              >
                Select Caretaker
              </option>

              {caretakers.map((caretaker: Caretaker) => (
                <option
                  key={caretaker.id}
                  value={caretaker.id}
                  style={{ backgroundColor: "#1a1a1a", color: "#f5f5f5" }}
                >
                  {caretaker.user?.name || "Sin nombre"}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white-ivory hover:bg-gray-700 rounded transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  console.log("Datos a guardar:", {
                    reservationId: reservation.id,
                    caretakerId: formData.caretakerId,
                  });

                  await onSave({
                    ...reservation,
                    caretaker:
                      caretakers.find((c) => c.id === formData.caretakerId) ||
                      null,
                  });
                  onClose();
                } catch (error) {
                  console.error("Error al guardar:", error);
                }
              }}
              className="px-4 py-2 bg-gold-soft text-black hover:bg-gold-soft/90 rounded transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

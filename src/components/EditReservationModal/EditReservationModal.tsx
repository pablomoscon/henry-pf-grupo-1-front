"use client";

import { useState, useEffect, useContext } from "react";
import { IReservationEdit } from "@/interfaces/IReserve";
import { UserContext } from "@/contexts/userContext";
import { caretakerService } from "@/services/caretakerServices";
import { UserData } from "@/interfaces/IUser";

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservation: IReservationEdit) => void;
  reservation: IReservationEdit | null;
}

export function EditReservationModal({
  isOpen,
  onClose,
  onSave,
  reservation,
}: EditReservationModalProps) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    caretakerId: "",
  });
  const [availableCaretakers, setAvailableCaretakers] = useState<UserData[]>(
    []
  );

  useEffect(() => {
    const loadData = async () => {
      if (!user?.response?.token || !isOpen) return;

      try {
        const caretakers = await caretakerService.getCaretakers(
          user.response.token
        );
        setAvailableCaretakers(caretakers);

        if (reservation) {
          const caretakerId =
            reservation.caretakers && reservation.caretakers.length > 0
              ? reservation.caretakers[0].id
              : "";
          setFormData({
            caretakerId,
          });
        }
      } catch (error) {
        console.error("Error loading caretakers:", error);
      }
    };

    loadData();
  }, [isOpen, user?.response?.token, reservation]);

  const [isReadyToSave, setIsReadyToSave] = useState(false);

  useEffect(() => {
    if (formData.caretakerId) {
      setIsReadyToSave(true);
    }
  }, [formData.caretakerId]);

  const handleSave = async () => {
    if (!reservation || !isReadyToSave) {
      console.log("Waiting for update...");
      return;
    }

    console.log("Saving with:", {
      reservationId: reservation.id,
      caretakerId: formData.caretakerId,
    });

    try {
      await onSave({
        ...reservation,
        caretakers: [{ id: formData.caretakerId }],
      });

      onClose();
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };

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
              onChange={(e) => setFormData({ caretakerId: e.target.value })}
              className="w-full p-2 rounded bg-black-dark text-white-ivory border border-gray-700"
            >
              <option value="">Select Caretaker</option>
              {availableCaretakers.map((caretaker) => (
                <option key={caretaker.id} value={caretaker.id}>
                  {caretaker.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white-ivory hover:bg-gray-700 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gold-soft text-black hover:bg-gold-soft/90 rounded transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

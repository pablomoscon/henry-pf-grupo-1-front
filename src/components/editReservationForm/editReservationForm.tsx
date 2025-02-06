// EditReservationForm.tsx
"use client";
import React, { useState, useEffect, useContext } from "react";
import { IReservationEdit } from "@/interfaces/IReserve";
import { caretakerService } from "@/services/caretakerServices";
import { UserData } from "@/interfaces/IUser";
import { UserContext } from "@/contexts/userContext";

export const EditReservationForm = ({
  reservation,
  onClose,
  onSave,
}: {
  reservation: IReservationEdit | null;
  onClose: () => void;
  onSave: (reservation: IReservationEdit) => void;
}) => {
  const { user } = useContext(UserContext);
  const [availableCaretakers, setAvailableCaretakers] = useState<UserData[]>(
    []
  );
  const [selectedCaretaker, setSelectedCaretaker] = useState<UserData | null>(
    null
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (user?.response.token) {
      const loadData = async () => {
        try {
          const caretakers = await caretakerService.getCaretakers(
            user.response.token
          );
          setAvailableCaretakers(caretakers);
        } catch (error) {
          console.error("Error loading caretakers", error);
        }
      };
      loadData();
    }
  }, [user?.response.token]);

  const handleSave = async () => {
    if (reservation && selectedCaretaker) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmDialogConfirm = async () => {
    if (reservation && selectedCaretaker) {
      const updatedReservation = {
        ...reservation,
        caretakers: [selectedCaretaker],
      };
      onSave(updatedReservation);
      alert("Reservation updated successfully!");
    }
    setShowConfirmDialog(false);
  };

  const handleCaretakerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCaretakerId = event.target.value;
    const caretaker = availableCaretakers.find(
      (c) => c.id === selectedCaretakerId
    );
    if (caretaker !== undefined) {
      setSelectedCaretaker(caretaker);
    } else {
      setSelectedCaretaker(null);
    }
  };

  return (
    <div className="bg-black-dark rounded-lg shadow-md p-4">
      <h3 className="text-lg mb-4" style={{ color: "var(--gold-soft)" }}>
        Assign Caretaker from Reservation:{" "}
        <span style={{ color: "var(--green-olive)" }}>{reservation?.id}</span>
      </h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="caretaker">
            Caretaker:
          </label>
          <div className="flex items-center mb-4">
            <select
              id="caretaker"
              className="block w-full p-1 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              value={selectedCaretaker?.id || ""}
              onChange={handleCaretakerChange}
            >
              <option value="">Select a caretaker</option>
              {availableCaretakers.length > 0 &&
                availableCaretakers.map((caretaker) => (
                  <option key={caretaker.id} value={caretaker.id}>
                    {caretaker.name}
                  </option>
                ))}
            </select>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-xs text-gray-800 font-semibold py-1 px-2 rounded ml-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-gold-soft hover:bg-gold-soft-dark text-xs text-gray-800 font-semibold py-1 px-4 rounded ml-4"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {showConfirmDialog && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-dark bg-opacity-50 flex justify-center items-center">
          <div className="bg-black rounded-lg shadow-md p-4 ">
            <h3
              className="text-lg mb-4 flex justify-center"
              style={{ color: "var(--gold-soft)" }}
            >
              Confirm Update
            </h3>
            <p className="flex justify-center">
              Are you sure you want to update the reservation?
            </p>
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="bg-green-dark hover:bg-gold-soft-dark text-gray-white mr-2 py-2 px-4 rounded"
                onClick={handleConfirmDialogConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className="bg-black-light hover:bg-opacity-80 text-gray-white  py-2 px-4 rounded "
                onClick={handleConfirmDialogClose}
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

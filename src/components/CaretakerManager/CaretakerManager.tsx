"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "@/contexts/userContext";
import { UserData, UserRegister } from "@/interfaces/IUser";
import { caretakerService } from "@/services/caretakerServices";
import {
  CaretakerForm,
  CaretakerFormData,
} from "../CaretakerForm/CaretakerForm";
import { CaretakersTable } from "../CaretakersTable/CaretakersTable";

const CaretakerManager = () => {
  const { user } = useContext(UserContext);
  const [caretakers, setCaretakers] = useState<UserData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadCaretakers = useCallback(async () => {
    try {
      const data = await caretakerService.getCaretakers(
        user?.response.token || ""
      );
      setCaretakers(data);
    } catch (error) {
      console.error("Error loading caretakers:", error);
      alert("Error loading caretakers");
    }
  }, [user]);

  useEffect(() => {
    if (user?.response.user.role !== "admin") {
      alert("Access Denied");
      return;
    }
    loadCaretakers();
  }, [loadCaretakers, user?.response.user.role]);

  const handleSubmit = async (formData: CaretakerFormData) => {
    try {
      const userData: UserRegister = {
        ...formData,
        confirmPassword: formData.confirmPassword || "",
      };
      await caretakerService.createCaretaker(userData);
      await loadCaretakers();
      setShowCreateForm(false);
      alert("Caretaker created successfully!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message.includes("already exists")
            ? "The email is already registered. Please use another email."
            : error.message
          : "Error creating caretaker";

      alert(errorMessage);
    }
  };

  const editCaretaker = async (updatedCaretaker: UserData) => {
    try {
      await caretakerService.updateCaretaker(
        updatedCaretaker,
        updatedCaretaker.id,
        user?.response.token || ""
      );

      await loadCaretakers();
      alert("Caretaker updated successfully!");
    } catch (error) {
      console.error("Error updating caretaker:", error);
      alert("Error updating caretaker");
    }
  };

  const handleDelete = async (caretakerToDelete: UserData) => {
    try {
      await caretakerService.deleteCaretaker(
        caretakerToDelete.id,
        user?.response.token || ""
      );
      await loadCaretakers();
      alert("Caretaker deleted successfully!");
    } catch (error) {
      console.error("Error deleting caretaker:", error);
      alert("Error deleting caretaker");
    }
  };

  return (
    <div className="min-h-screen px-4 bg-black-dark">
      <div className="w-full max-w-5xl mx-auto pt-2 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl" style={{ color: "var(--gold-soft)" }}>
            Caretaker Management
          </h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gold-soft text-black-dark px-4 py-2 rounded hover:bg-gold-hover"
          >
            {showCreateForm ? "Back to List" : "Create New Caretaker"}
          </button>
        </div>

        {showCreateForm ? (
          <div>
            <CaretakerForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="mt-6">
            <CaretakersTable
              caretakers={caretakers}
              updateCaretaker={editCaretaker}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CaretakerManager;

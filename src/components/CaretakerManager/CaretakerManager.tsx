"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "@/contexts/userContext";
import { UserData, UserRegister } from "@/interfaces/IUser";
import { caretakerService } from "@/services/caretakerServices";
import { CaretakerForm } from "../CaretakerForm/CaretakerForm";
import { CaretakersTable } from "../CaretakersTable/CaretakersTable";
import { DeleteModal } from "../DeleteModal/DeleteModal";

const CaretakerManager = () => {
  const { user } = useContext(UserContext);
  const [caretakers, setCaretakers] = useState<UserData[]>([]);
  const [currentCaretaker, setCurrentCaretaker] = useState<
    UserRegister & { id?: string }
  >({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    customerId: "",
  });
  const [editionMode, setEditionMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [caretakerToDelete, setCaretakerToDelete] = useState<string>("");

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

  const validateForm = () => {
    if (
      !editionMode &&
      currentCaretaker.password !== currentCaretaker.confirmPassword
    ) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editionMode && currentCaretaker.id) {
        await caretakerService.updateCaretaker(
          currentCaretaker,
          currentCaretaker.id,
          user?.response.token || ""
        );
      } else {
        await caretakerService.createCaretaker(currentCaretaker);
      }
      await loadCaretakers();
      cleanForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving caretaker");
    }
  };

  const editCaretaker = (caretaker: UserData) => {
    setCurrentCaretaker({
      id: caretaker.id,
      email: caretaker.email,
      password: "",
      confirmPassword: "",
      name: caretaker.name,
      phone: caretaker.phone,
      address: caretaker.address,
      customerId: caretaker.customerId,
    });
    setEditionMode(true);
  };

  const deleteCaretaker = async () => {
    try {
      await caretakerService.deleteCaretaker(
        caretakerToDelete,
        user?.response.token || ""
      );
      await loadCaretakers();
      setShowModal(false);
      setCaretakerToDelete("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting caretaker");
    }
  };

  const cleanForm = () => {
    setCurrentCaretaker({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      address: "",
      customerId: "",
    });
    setEditionMode(false);
  };

  const handleCaretakerChange = (field: string, value: string) => {
    setCurrentCaretaker((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          Caretaker Management
        </h2>

        <CaretakerForm
          currentCaretaker={currentCaretaker}
          editionMode={editionMode}
          onSubmit={handleSubmit}
          onCancel={cleanForm}
          onChange={handleCaretakerChange}
        />

        <CaretakersTable
          caretakers={caretakers}
          onEdit={editCaretaker}
          onDelete={(id) => {
            setCaretakerToDelete(id);
            setShowModal(true);
          }}
        />

        <DeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={deleteCaretaker}
          title="Confirm deletion"
          message="Are you sure you want to delete this caretaker?"
        />
      </div>
    </div>
  );
};

export default CaretakerManager;

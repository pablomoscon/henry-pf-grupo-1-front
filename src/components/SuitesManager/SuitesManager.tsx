"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { IRoom } from "@/interfaces/IRoom";
import { getRooms } from "@/services/roomService";
import { roomService } from "@/services/roomService";
import SuitesForm from "../SuitesForm/SuitesForm";
import { SuitesTable } from "../SuitesTable/SuitesTable";
import { EditSuiteForm } from "../EditSuiteForm/EditSuiteForm";
import { DeleteModal } from "../DeleteModal/DeleteModal";

const SuitesManager = () => {
  const { user } = useContext(UserContext);
  const [suites, setSuites] = useState<IRoom[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [suiteToEdit, setSuiteToEdit] = useState<IRoom | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [suiteToDelete, setSuiteToDelete] = useState<IRoom | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const loadSuites = async () => {
    try {
      const data = await getRooms();
      setSuites(data);
    } catch (error) {
      console.error("Error loading suites:", error);
    }
  };

  useEffect(() => {
    loadSuites();
  }, []);

  const handleEdit = (suite: IRoom) => {
    console.log("Suite to edit:", suite);
    const suiteWithId = {
      ...suite,
      _id: suite.id,
    };
    setSuiteToEdit(suiteWithId);
    setShowEditForm(true);
  };

  const handleDelete = async () => {
    try {
      if (!suiteToDelete?.id) {
        throw new Error("Suite ID is required");
      }

      await roomService.deleteRoom(
        suiteToDelete.id,
        user?.response.token || ""
      );
      setSuites(suites.filter((s) => s.id !== suiteToDelete.id));
      setShowConfirmDelete(false);
      setSuiteToDelete(null);
      alert("Suite successfully deleted");
    } catch (error) {
      console.error("Error deleting suite:", error);
      alert("Error deleting suite");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-gold-soft mb-6">Suites Management</h1>

      <div className="space-y-6">
        <SuitesForm onSuccess={loadSuites} />

        <SuitesTable
          suites={suites}
          onEdit={handleEdit}
          setSuiteToDelete={setSuiteToDelete}
          setShowConfirmDelete={setShowConfirmDelete}
        />

        {showEditForm && suiteToEdit && (
          <EditSuiteForm
            suite={suiteToEdit}
            onClose={() => setShowEditForm(false)}
            onSuccess={loadSuites}
            token={user?.response.token || ""}
          />
        )}

        <DeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => suiteToDelete && handleDelete()}
          title="Confirm deletion"
          message="Are you sure you want to delete this suite?"
        />

        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black-dark p-6 rounded-lg w-full max-w-sm">
              <h3 className="text-xl text-gold-soft mb-4">Confirm Delete</h3>
              <p className="text-white-ivory mb-6">
                Are you sure you want to delete the suite &ldquo;
                {suiteToDelete?.name}&rdquo;?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="bg-black-light text-white-ivory px-6 py-2.5 rounded hover:bg-opacity-80 text-sm font-medium min-w-[100px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-6 py-2.5 rounded hover:bg-red-600 text-sm font-medium min-w-[100px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuitesManager;

"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { IRoomResponse } from "@/interfaces/IRoom";
import { getRooms } from "@/services/roomService";
import { roomService } from "@/services/roomService";
import SuitesForm from "../SuitesForm/SuitesForm";
import { SuitesTable } from "../SuitesTable/SuitesTable";
import { EditSuiteForm } from "../EditSuiteForm/EditSuiteForm";
import { DeleteModal } from "../DeleteModal/DeleteModal";

const SuitesManager = () => {
  const { user } = useContext(UserContext);
  const [suites, setSuites] = useState<IRoomResponse[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [suiteToEdit, setSuiteToEdit] = useState<IRoomResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [suiteToDelete, setSuiteToDelete] = useState<IRoomResponse | null>(
    null
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadSuites = async () => {
    try {
      const data = await getRooms();
      setSuites(data);
    } catch {
      alert("Error loading suites");
    }
  };

  useEffect(() => {
    loadSuites();
  }, []);

  const handleEdit = (suite: IRoomResponse) => {
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
    } catch {
      alert("Error deleting suite");
    }
  };

  const handleCreateSuccess = async () => {
    await loadSuites();
    setShowCreateForm(false);
    alert("Suite created successfully!");
  };

  return (
    <div className="min-h-screen px-4 bg-black-dark">
      <div className="w-full max-w-5xl mx-auto pt-2 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl" style={{ color: "var(--gold-soft)" }}>
            Suites Management
          </h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gold-soft text-black-dark px-4 py-2 rounded hover:bg-gold-hover"
          >
            {showCreateForm ? "Back to List" : "Create New Suite"}
          </button>
        </div>

        {showCreateForm ? (
          <div>
            <SuitesForm onSuccess={handleCreateSuccess} />
          </div>
        ) : (
          <div className="mt-6">
            <SuitesTable
              suites={suites}
              onEdit={handleEdit}
              setSuiteToDelete={setSuiteToDelete}
              setShowConfirmDelete={setShowConfirmDelete}
            />
          </div>
        )}

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

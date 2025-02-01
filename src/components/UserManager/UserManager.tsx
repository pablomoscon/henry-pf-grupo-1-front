"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "@/contexts/userContext";
import { UserData, UserRegister } from "@/interfaces/IUser";
import { userManagerService } from "@/services/userManagerServices";
import { UserForm } from "../UserForm/UserForm";
import { UsersTable } from "../UsersTable/UsersTable";
import { DeleteModal } from "../DeleteModal/DeleteModal";

const UserManager = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<
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
  const [userToDelete, setUserToDelete] = useState<string>("");

  const loadUsers = useCallback(async () => {
    try {
      const data = await userManagerService.getUsers(
        user?.response.token || ""
      );
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Error loading users");
    }
  }, [user]);

  useEffect(() => {
    if (user?.response.user.role !== "admin") {
      alert("Access Denied");
      return;
    }
    loadUsers();
  }, [loadUsers, user?.response.user.role]);

  const validateForm = () => {
    if (!editionMode && currentUser.password !== currentUser.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editionMode && currentUser.id) {
        await userManagerService.updateUser(
          currentUser,
          currentUser.id,
          user?.response.token || ""
        );
        alert("User updated successfully!");
      } else {
        if (!currentUser.password || !currentUser.confirmPassword) {
          alert("Please fill in all required fields");
          return;
        }

        if (currentUser.password !== currentUser.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await userManagerService.createUser(currentUser);
        alert("User created successfully!");
      }

      await loadUsers();
      cleanForm();
    } catch (error: Error | unknown) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error saving user");
    }
  };

  const editUser = (userData: UserData) => {
    setCurrentUser({
      id: userData.id,
      email: userData.email,
      password: "",
      confirmPassword: "",
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      customerId: userData.customerId,
    });
    setEditionMode(true);
  };

  const deleteUser = async () => {
    try {
      await userManagerService.deleteUser(
        userToDelete,
        user?.response.token || ""
      );
      await loadUsers();
      setShowModal(false);
      setUserToDelete("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting user");
    }
  };

  const cleanForm = () => {
    setCurrentUser({
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

  const handleUserChange = (field: string, value: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          User Management
        </h2>

        <UserForm
          currentUser={currentUser}
          editionMode={editionMode}
          onSubmit={handleSubmit}
          onCancel={cleanForm}
          onChange={handleUserChange}
        />

        <UsersTable
          users={users}
          onEdit={editUser}
          onDelete={(id) => {
            setUserToDelete(id);
            setShowModal(true);
          }}
        />

        <DeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={deleteUser}
          title="Confirm deletion"
          message="Are you sure you want to delete this user?"
        />
      </div>
    </div>
  );
};

export default UserManager;

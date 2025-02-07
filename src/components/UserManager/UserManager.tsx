"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "@/contexts/userContext";
import { UserData, UserRegister } from "@/interfaces/IUser";
import { userManagerService } from "@/services/userManagerServices";
import { UserForm } from "../UserForm/UserForm";
import { UsersTable } from "../UsersTable/UsersTable";

const UserManager = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<UserData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const data = await userManagerService.getUsers(
        user?.response.token || ""
      );
      setUsers(data);
    } catch {
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

  const handleSubmit = async (formData: UserRegister) => {
    try {
      const { ...userData } = formData;
      await userManagerService.createUser(userData);
      await loadUsers();
      setShowCreateForm(false);
      alert("Usuario creado exitosamente!");
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Error al crear usuario");
    }
  };

  const editUser = async (updatedUser: UserData) => {
    try {
      await userManagerService.updateUser(
        updatedUser,
        updatedUser.id,
        user?.response.token || ""
      );
      await loadUsers();
      alert("User updated successfully!");
    } catch {
      alert("Error updating user");
    }
  };

  const handleDelete = async (userToDelete: UserData) => {
    try {
      await userManagerService.deleteUser(
        userToDelete.id,
        user?.response.token || ""
      );
      await loadUsers();
      alert("User deleted successfully!");
    } catch {
      alert("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen px-4 bg-black-dark">
      <div className="w-full max-w-5xl mx-auto pt-2 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl" style={{ color: "var(--gold-soft)" }}>
            User Management
          </h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gold-soft text-black-dark px-4 py-2 rounded hover:bg-gold-hover"
          >
            {showCreateForm ? "Back to List" : "Create New User"}
          </button>
        </div>

        {showCreateForm ? (
          <div>
            <UserForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="mt-6">
            <UsersTable
              users={users}
              updateUser={editUser}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;

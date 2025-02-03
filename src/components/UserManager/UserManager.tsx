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

  const handleSubmit = async (formData: UserRegister) => {
    try {
      const { ...userData } = formData;
      console.log("Datos a enviar:", userData);
      await userManagerService.createUser(userData);
      await loadUsers();
      alert("Usuario creado exitosamente!");
    } catch (error: unknown) {
      console.error("Error al crear usuario:", error);
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
    } catch (error) {
      console.error("Error updating user:", error);
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
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen px-4 bg-black-dark">
      <div className="w-full max-w-5xl mx-auto pt-2 p-6 rounded-lg shadow-md space-y-3">
        <h2 className="text-2xl mb-4" style={{ color: "var(--gold-soft)" }}>
          User Management
        </h2>

        <UserForm onSubmit={handleSubmit} />

        <UsersTable
          users={users}
          updateUser={editUser}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default UserManager;

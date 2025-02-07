import { UserData, UserRegister } from "@/interfaces/IUser";
import { userRegister } from "./userServices";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const userManagerService = {
  async getUsers(token: string | undefined): Promise<UserData[]> {
    const response = await fetchWithInterceptor(`${API_URL}/users/user-role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async createUser(
    userData: Omit<UserRegister, "role" | "confirmPassword">
  ): Promise<void> {
    await userRegister({
      ...userData,
      role: "user",
      status: "active",
      isVerified: true,
      confirmPassword: userData.password,
    } as UserRegister);
  },

  async updateUser(
    userData: Partial<UserData>,
    id: string,
    token: string
  ): Promise<UserData> {
    const { name, email, phone, address, customerId } = userData;
    const updateData = { name, email, phone, address, customerId };

    const res = await fetchWithInterceptor(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update user");
    }

    return res.json();
  },

  async deleteUser(id: string, token: string): Promise<void> {
    const response = await fetchWithInterceptor(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error deleting user");
  },
};

import { UserData, UserRegister } from "@/interfaces/IUser";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const caretakerService = {
  async getCaretakers(token: string): Promise<UserData[]> {
    const response = await fetchWithInterceptor(`${API_URL}/users/caretakers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw new Error("Failed to fetch caretakers");
    }

    return response.json();
  },

  async createCaretaker(
    caretaker: Omit<UserRegister, "role" | "confirmPassword">
  ): Promise<void> {
    const response = await fetchWithInterceptor(
      `${API_URL}/auth/caretaker-signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...caretaker,
          role: "caretaker",
          status: "active",
          isVerified: true,
          confirmPassword: caretaker.password,
        }),
      }
    );

    if (!response) {
      throw new Error("Failed to create caretaker");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear caretaker");
    }
  },

  async updateCaretaker(
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

    if (!res) {
      throw new Error("Failed to update caretaker");
    }

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update profile");
    }

    return res.json();
  },

  async deleteCaretaker(id: string, token: string): Promise<void> {
    const response = await fetchWithInterceptor(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw new Error("Failed to delete caretaker");
    }

    if (!response.ok) {
      throw new Error("Error deleting caretaker");
    }
  },
};

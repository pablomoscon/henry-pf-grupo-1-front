import { UserData, UserRegister } from "@/interfaces/IUser";

export const caretakerService = {
  async getCaretakers(token: string): Promise<UserData[]> {
    const response = await fetch("http://localhost:3000/users/caretakers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async createCaretaker(
    caretaker: Omit<UserRegister, "role" | "confirmPassword">
  ): Promise<void> {
    const response = await fetch("http://localhost:3000/auth/caretaker-signup", {
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
    });

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

    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update profile");
    }

    return res.json();
  },

  async deleteCaretaker(id: string, token: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error deleting caretaker");
  },
};

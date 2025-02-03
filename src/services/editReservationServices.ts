import { IReservation } from "@/interfaces/IReserve";
import { UserData } from "@/interfaces/IUser";

export const reservationService = {
  async getReservations(token?: string): Promise<IReservation[]> {
    const response = await fetch("http://localhost:3000/reservations", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  async createReservation(
    data: Omit<IReservation, "id">
  ): Promise<IReservation> {
    const response = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error creating reservation");
    return response.json();
  },

  async updateReservation(
    id: string,
    data: {
      reservationId: string;
      caretakerId: string;
    },
    token?: string
  ): Promise<IReservation> {
    console.log("1. Datos recibidos:", { id, data });

    const updateData = {
      caretakerId: data.caretakerId,
    };

    console.log("2. Datos a enviar:", updateData);

    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("3. Error response del backend:", {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText,
      });
      throw new Error("Error updating reservation");
    }

    const responseData = await response.json();
    console.log("4. Respuesta exitosa del backend:", responseData);

    return responseData;
  },

  async deleteReservation(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting reservation");
  },

  async getCaretakers(token: string): Promise<UserData[]> {
    const response = await fetch("http://localhost:3000/caretakers", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  async updateCats(
    id: string,
    numberOfCats: number,
    token?: string
  ): Promise<IReservation> {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        roomId: id,
        number_of_cats: numberOfCats,
      }),
    });

    if (!response.ok) throw new Error("Failed to update cats");
    return response.json();
  },
};

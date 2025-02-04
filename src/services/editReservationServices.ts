import { IReservationEdit } from "@/interfaces/IReserve";

export const reservationService = {
  async getReservations(token?: string): Promise<IReservationEdit[]> {
    const response = await fetch("http://localhost:3000/reservations", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),

        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Raw response:", data);
    return data;
  },
  async createReservation(
    data: Omit<IReservationEdit, "id">
  ): Promise<IReservationEdit> {
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
      caretakerId: string;
    },
    token?: string
  ): Promise<IReservationEdit> {
    try {
      console.log("Sending update request with:", { id, data });

      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          caretakers: [data.caretakerId],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en updateReservation:", error);
      throw error;
    }
  },

  async deleteReservation(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting reservation");
  },
};

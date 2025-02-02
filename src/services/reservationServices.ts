import { IReservation } from "@/interfaces/IReserve";

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
    data: IReservation,
    token?: string
  ): Promise<IReservation> {
    console.log("Datos a enviar:", { id, data });

    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error("Error updating reservation");
    }

    return response.json();
  },

  async deleteReservation(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting reservation");
  },
};

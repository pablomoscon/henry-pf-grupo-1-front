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
};

import { IReservation } from "@/interfaces/IReserve";
import { API_URL } from "../../envs";

export const reservationService = {
  async getReservations(token?: string): Promise<IReservation[]> {
    const response = await fetch(`${API_URL}/reservations`, {
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

import { fetchWithInterceptor } from "./fetchInterceptor";
import { IReservation } from "@/interfaces/IReserve";
import { API_URL } from "../../envs";

export const reservationService = {
  async getReservations(token?: string): Promise<IReservation[]> {
    const response = await fetchWithInterceptor(`${API_URL}/reservations`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });

    if (response === null || !response.ok) {
      throw new Error(`Error ${response?.status || "Unknown"}: ${response?.statusText || "No response"}`);
    }

    return response.json();
  },
};

import { IReservationEdit } from "@/interfaces/IReserve";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const reservationService = {
  async getReservations(token?: string): Promise<IReservationEdit[]> {
    const response = await fetchWithInterceptor(`${API_URL}/reservations`, {
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
    const response = await fetchWithInterceptor(`${API_URL}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error creating reservation");
    return response.json();
  },

  async updateReservation(
    reservationId: string,
    data: { caretakerId: string },
    token?: string
  ): Promise<IReservationEdit> {
    try {
      console.log("Sending update request with:", { reservationId, data });

      const response = await fetchWithInterceptor(
        `${API_URL}/reservations/${reservationId}/add-caretaker/${data.caretakerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Retornamos la respuesta en formato JSON
      return await response.json();
    } catch (error) {
      console.error("Error en updateReservation:", error);
      throw error;
    }
  },

  async deleteReservation(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error deleting reservation");
  },

  async unassignCaretaker(
    reservationId: string,
    data: { caretakerId: string },
    token?: string
  ): Promise<IReservationEdit> {
    try {
      console.log("Sending update request with:", { reservationId, data });

      const response = await fetch(
        `${API_URL}/reservations/${reservationId}/caretaker/${data.caretakerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

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
};

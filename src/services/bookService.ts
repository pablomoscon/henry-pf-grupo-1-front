import dayjs from "dayjs";
import { IReserve } from "@/interfaces/IReserve";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const getDateReserved = async (
  roomId: string,
  token: string
): Promise<string[]> => {
  const blockedDates: string[] = [];

  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/reservations/unavailable-rooms?roomId=${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener las reservas");
    }

    // Parseamos la respuesta
    const bookings = await response.json();

    // Iteramos sobre las reservas y generamos las fechas bloqueadas
    bookings.forEach(
      (booking: { checkInDate: string; checkOutDate: string }) => {
        const start = dayjs(booking.checkInDate, "YYYY-MM-DD");
        const end = dayjs(booking.checkOutDate, "YYYY-MM-DD");
        let current = start;

        while (current.isBefore(end.add(1, "day"))) {
          blockedDates.push(current.format("YYYY-MM-DD"));
          current = current.add(1, "day");
        }
      }
    );
  } catch (error) {
    console.error("Error al obtener las fechas bloqueadas:", error);
  }

  return blockedDates;
};

export const bookRegister = async (
  data: IReserve,
  token: string | undefined
) => {
  const res = await fetchWithInterceptor(`${API_URL}/reservations/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = JSON.parse(errorData.message).message;
    throw new Error(errorMessage);
  }

  return res.json();
};

export const getUserReservations = async (userId: string, token?: string) => {
  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/reservations/users-reservations?userId=${userId}`,
      {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return [];
  }
};

export const getUserBooks = async (userId: string, token?: string) => {
  try {
    const response = await fetchWithInterceptor(
      `${API_URL}/users/${userId}/caretaker-reservations`,
      {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      console.error(
        `Error en la respuesta: ${response.status} - ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return [];
  }
};

import dayjs from "dayjs";
import { IReserve } from "@/interfaces/IReserve";

// Reemplazamos el mock por una llamada al endpoint
export const getDateReserved = async (roomId: string): Promise<string[]> => {
  const blockedDates: string[] = [];

  try {
    // Llamamos al endpoint con el roomId
    const response = await fetch(
      `http://localhost:3000/reservations/unavailable-rooms?roomId=${roomId}`
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

export const bookRegister = async (data: IReserve) => {
  const res = await fetch("http://localhost:3000/reservations/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  return res.json();
};

export const getUserReservations = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/reservations/users-reservations?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las reservas del usuario");
    }

    const reservations = await response.json();
    return reservations;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return [];
  }
};

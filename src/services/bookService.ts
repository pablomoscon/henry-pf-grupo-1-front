import bookings from "@/mocks/bookings";
import dayjs from "dayjs";
import { IBook } from "@/interfaces/IBook";

export const getDateReserved = (): string[] => {
  const blockedDates: string[] = []; //

  bookings.forEach((booking: IBook) => {
    const start = dayjs(booking.checkInDate, "YYYY/MM/DD");
    const end = dayjs(booking.checkOutDate, "YYYY/MM/DD");
    let current = start;

    while (current.isBefore(end.add(1, "day"))) {
      blockedDates.push(current.format("YYYY/MM/DD"));
      current = current.add(1, "day");
    }
  });

  return blockedDates as string[];
};

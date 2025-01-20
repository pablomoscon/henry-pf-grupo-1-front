"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useDateContext } from "@/contexts/dateContext"; // Contexto de fechas
import dayjs, { Dayjs } from "dayjs";
import { getDateReserved } from "@/services/bookService";

const arrayReserve = getDateReserved();
const reservedDates = arrayReserve.map((date) => dayjs(date));

const CheckIn = () => {
  const { checkInDate, setCheckInDate } = useDateContext(); // Contexto de fechas

  const isReserved = (date: Dayjs) => {
    return reservedDates.some((reserved) => reserved.isSame(date, "day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center">
        <DateCalendar
          value={checkInDate} // Pasamos el estado actual
          onChange={(date) => setCheckInDate(date)} // Actualizamos el estado
          shouldDisableDate={isReserved} // Deshabilitamos fechas reservadas
          slots={{
            day: (props) => {
              const { day, outsideCurrentMonth } = props;
              const isDisabled = isReserved(day);
              // Usamos el renderizado sin conflictos
              return (
                <button
                  onClick={() => !isDisabled && setCheckInDate(day)} // Evitamos que se cambie si la fecha está reservada
                  className={`p-2 rounded-full ${
                    isDisabled ? "bg-red-500 text-white cursor-not-allowed" : ""
                  } ${
                    outsideCurrentMonth ? "text-gray-400" : "text-white-ivory"
                  }`}
                  disabled={isDisabled}
                >
                  {day.format("D")}
                </button>
              );
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default CheckIn;

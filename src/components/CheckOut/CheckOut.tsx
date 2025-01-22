"use client";
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useDateContext } from "@/contexts/dateContext"; // Contexto de fechas
import dayjs, { Dayjs } from "dayjs";
import { getDateReserved } from "@/services/bookService";

interface CheckInProps {
  roomId: string;
}

const CheckOut: React.FC<CheckInProps> = ({ roomId }) => {
  const { checkOutDate, setCheckOutDate } = useDateContext(); // Contexto de fechas

  const [reservedDates, setReservedDates] = useState<Dayjs[]>([]); // Estado para las fechas bloqueadas

  // Llamada al servicio para obtener fechas bloqueadas
  useEffect(() => {
    const fetchReservedDates = async () => {
      if (!roomId) return; // No hacemos nada si no hay roomId
      try {
        const blockedDates = await getDateReserved(roomId);
        setReservedDates(blockedDates.map((date) => dayjs(date))); // Convertimos las fechas a Dayjs
      } catch (error) {
        console.error("Error al obtener las fechas bloqueadas:", error);
      }
    };

    fetchReservedDates();
  }, [roomId]);

  // Función para verificar si una fecha está reservada
  const isReserved = (date: Dayjs) => {
    return reservedDates.some((reserved) => reserved.isSame(date, "day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center">
        <DateCalendar
          value={checkOutDate} // Pasamos el estado actual
          onChange={(date) => setCheckOutDate(date)} // Actualizamos el estado
          shouldDisableDate={isReserved} // Deshabilitamos fechas reservadas
          slots={{
            day: (props) => {
              const { day, outsideCurrentMonth } = props;
              const isDisabled = isReserved(day);
              // Usamos el renderizado sin conflictos
              return (
                <button
                  onClick={() => !isDisabled && setCheckOutDate(day)} // Evitamos que se cambie si la fecha está reservada
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

export default CheckOut;

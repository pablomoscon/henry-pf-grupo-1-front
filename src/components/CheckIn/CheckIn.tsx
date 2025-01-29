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
  token: string | undefined;
}

const CheckIn: React.FC<CheckInProps> = ({ roomId, token }) => {
  const { checkInDate, setCheckInDate } = useDateContext(); // Contexto de fechas
  const [reservedDates, setReservedDates] = useState<Dayjs[]>([]); // Estado para las fechas bloqueadas

  // Llamada al servicio para obtener fechas bloqueadas
  useEffect(() => {
    const fetchReservedDates = async () => {
      if (!roomId || !token) {
        console.warn("roomId o token no disponibles");
        return;
      }
      try {
        console.log("Token enviado al servicio:", token); // Para verificar el valor del token
        const blockedDates = await getDateReserved(roomId, token);
        console.log("Fechas bloqueadas recibidas:", blockedDates);
        setReservedDates(blockedDates.map((date) => dayjs(date))); // Convertimos las fechas a Dayjs
      } catch (error) {
        console.error("Error al obtener las fechas bloqueadas:", error);
      }
    };

    fetchReservedDates();
  }, [roomId, token]);

  // Función para verificar si una fecha está reservada
  const isReserved = (date: Dayjs) => {
    return reservedDates.some((reserved) => reserved.isSame(date, "day"));
  };

  // Componente para renderizar cada día con personalización
  const renderDay = (props: any) => {
    const { day, outsideCurrentMonth } = props;
    const isDisabled = isReserved(day);
    const isSelected = day.isSame(checkInDate, "day");

    return (
      <button
        onClick={() => !isDisabled && setCheckInDate(day)} // Solo permitimos clics en fechas habilitadas
        className={`p-2 rounded-full transition-all duration-200 ${
          isDisabled
            ? "bg-red-500 text-white cursor-not-allowed"
            : isSelected
            ? "bg-gold-dark text-white"
            : "hover:bg-blue-200 text-black"
        } ${outsideCurrentMonth ? "text-gray-400" : ""}`}
        disabled={isDisabled}
      >
        {day.format("D")}
      </button>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center">
        <DateCalendar
          value={checkInDate} // Pasamos el estado actual
          onChange={(date) => setCheckInDate(date)} // Actualizamos el estado
          shouldDisableDate={isReserved} // Deshabilitamos fechas reservadas
          slots={{
            day: renderDay,
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default CheckIn;

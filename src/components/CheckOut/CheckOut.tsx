"use client";
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useDateContext } from "@/contexts/dateContext"; // Contexto de fechas
import dayjs, { Dayjs } from "dayjs";
import { getDateReserved } from "@/services/bookService";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";

interface CheckOutProps {
  roomId: string;
  token: string | undefined;
}

const CheckOut: React.FC<CheckOutProps> = ({ roomId, token }) => {
  const { checkOutDate, setCheckOutDate } = useDateContext();
  const [reservedDates, setReservedDates] = useState<Dayjs[]>([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      if (!roomId || !token) {
        console.warn("roomId o token no disponibles");
        return;
      }
      try {
        console.log("Token enviado al servicio:", token);
        const blockedDates = await getDateReserved(roomId, token);
        console.log("Fechas bloqueadas recibidas:", blockedDates);
        setReservedDates(blockedDates.map((date) => dayjs(date)));
      } catch (error) {
        console.error("Error al obtener las fechas bloqueadas:", error);
      }
    };

    fetchReservedDates();
  }, [roomId, token]);

  const isReserved = (date: Dayjs) => {
    return reservedDates.some((reserved) => reserved.isSame(date, "day"));
  };

  const isPastDate = (date: Dayjs) => {
    return date.isBefore(dayjs(), "day");
  };

  const renderDay = (props: PickersDayProps<Dayjs>) => {
    const { day, outsideCurrentMonth } = props;
    const isDisabled = isReserved(day) || isPastDate(day);
    const isSelected = day.isSame(checkOutDate, "day");

    return (
      <button
        onClick={() => !isDisabled && setCheckOutDate(day)}
        className={`p-2 rounded-full transition-all duration-200 text-white ${
          isDisabled
            ? "text-red-500 cursor-not-allowed"
            : isSelected
            ? "bg-gold-dark"
            : "hover:bg-green-dark"
        } ${outsideCurrentMonth ? "text-gray-500" : ""}`}
        disabled={isDisabled}
        style={{
          color: isDisabled ? "red" : "",
        }}
      >
        {day.format("D")}
      </button>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center">
        <DateCalendar
          value={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          shouldDisableDate={(date) => isReserved(date) || isPastDate(date)}
          slots={{
            day: renderDay,
          }}
          sx={{
            "& .MuiPickersCalendarHeader-label": { color: "white" },
            "& .MuiPickersArrowSwitcher-root button": { color: "white" },
            "& .MuiDayCalendar-weekDayLabel": { color: "white" },
            "& .MuiButtonBase-root:disabled": { color: "red !important" },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default CheckOut;

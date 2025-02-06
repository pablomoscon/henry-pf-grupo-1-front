// DateContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";

// Tipos de datos del contexto
interface DateContextType {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  setCheckInDate: (date: Dayjs | null) => void;
  setCheckOutDate: (date: Dayjs | null) => void;
}

// Contexto inicial
const DateContext = createContext<DateContextType | undefined>(undefined);

// Proveedor del contexto
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  return (
    <DateContext.Provider
      value={{
        checkInDate,
        checkOutDate,
        setCheckInDate,
        setCheckOutDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

// Hook para usar el contexto
export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};

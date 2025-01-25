"use client";

import { useState } from "react";
import { filterRooms } from "@/services/roomService";
import { IRoom } from "@/interfaces/IRoom";
import Card from "@/components/Card/Card";
import Filter from "@/components/Filter/Filter";

const SuitesClient = ({ initialRooms }: { initialRooms: IRoom[] }) => {
  const [rooms, setRooms] = useState<IRoom[]>(initialRooms);

  // Manejar filtrado
  const handleFilter = async (
    checkInDate: string,
    checkOutDate: string,
    numberOfCats: string,
    minPrice: string,
    maxPrice: string
  ) => {
    const filteredRooms = await filterRooms(
      checkInDate,
      checkOutDate,
      numberOfCats,
      minPrice,
      maxPrice
    );
    setRooms(filteredRooms);
  };

  return (
    <>
      <h1 className="mt-6 mb-2 text-gold-soft font-primary text-center">
        Our Suites
      </h1>

      {/* Contenedor del Filtro */}
      <div className="bg-dark-soft rounded-lg p-4 w-full max-w-6xl mx-auto mb-2">
        <Filter onFilter={handleFilter} />
      </div>

      {/* Contenedor de las Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto mb-2">
        {rooms.map((room: IRoom) => (
          <Card key={room.id} room={room} />
        ))}
      </div>
    </>
  );
};

export default SuitesClient;

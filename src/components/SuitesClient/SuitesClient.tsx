"use client";

import { useState } from "react";
import { filterRooms } from "@/services/roomService";
import { IRoom } from "@/interfaces/IRoom";
import Card from "@/components/Card/Card";
import Filter from "@/components/Filter/Filter";

const SuitesClient = ({ initialRooms }: { initialRooms: IRoom[] }) => {
  // Ordenar las habitaciones iniciales por precio
  const sortedInitialRooms = [...initialRooms].sort(
    (a, b) => a.price - b.price
  );
  const [rooms, setRooms] = useState<IRoom[]>(sortedInitialRooms);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

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
    // Ordenar las habitaciones filtradas por precio
    const sortedFilteredRooms = [...filteredRooms].sort(
      (a, b) => a.price - b.price
    );
    setRooms(sortedFilteredRooms);
  };

  // Calcular índices para la paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRooms = rooms.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(rooms.length / cardsPerPage);

  // Función para cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Función para resetear los filtros
  const handleReset = () => {
    setRooms(sortedInitialRooms);
    setCurrentPage(1); // Volver a la primera página
  };

  return (
    <>
      <h1 className="mt-6 mb-2 text-gold-soft font-primary text-center">
        Our Suites
      </h1>

      {/* Contenedor del Filtro */}
      <div className="bg-dark-soft rounded-lg p-4 w-full max-w-6xl mx-auto mb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Filter onFilter={handleFilter} onReset={handleReset} />
          </div>
        </div>
      </div>

      {/* Contenedor de las Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto mb-2">
        {currentRooms.map((room: IRoom) => (
          <Card key={room.id} room={room} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-4 mb-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-gold-soft text-white"
                : "bg-dark-soft text-gold-soft hover:bg-gold-soft hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default SuitesClient;

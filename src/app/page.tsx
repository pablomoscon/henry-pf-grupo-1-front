"use client";
import { useEffect, useState } from "react";
import { getRooms, filterRooms } from "@/services/roomService";
import { IRoom } from "@/interfaces/IRoom";
import Card from "@/components/Card/Card";
import Filter from "@/components/Filter/Filter";

const Home = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  // Cargar habitaciones iniciales
  useEffect(() => {
    const loadRooms = async () => {
      const allRooms = await getRooms();
      setRooms(allRooms);
    };
    loadRooms();
  }, []);

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
    <main
      className="relative w-full h-full bg-black text-white-ivory"
      style={{
        backgroundImage: `url('/BannerHome.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full h-[95vh]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-secondary font-medium text-center">
            The luxury home for your cat
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center text-gray-ash">
            Exclusive experience, designed for feline comfort.
          </p>
          <a href="#our-suites" className="button_green mt-6">
            EXPLORE
          </a>
        </div>
      </div>
      <div
        id="our-suites"
        className="relative z-10 container pt-12 -mt-12 bg-black/80 backdrop-blur-sm rounded-lg"
      >
        <h1 className="mt-6 mb-2 text-gold-soft font-secondary text-center">
          Our Suites
        </h1>

        {/* Contenedor del Filtro */}
        <div className="bg-dark-soft rounded-lg p-4 w-full max-w-6xl mx-auto mb-6">
          <Filter onFilter={handleFilter} />
        </div>

        {/* Contenedor de las Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
          {rooms.map((room: IRoom) => (
            <Card key={room.id} room={room} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

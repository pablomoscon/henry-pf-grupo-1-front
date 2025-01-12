"use client";
import Image from "next/image";
import { getRooms } from "@/services/roomService";
import { IRoom } from "@/interfaces/IRoom";
import Card from "@/components/Card/Card";

const rooms = await getRooms();

const Home = () => {
  return (
    <main>
      <div className="flex flex-col">
        <div className="relative mb-9 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/BannerHome.jpg"
            alt="Banner del sitio"
            width={800}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-secondary font-medium text-center text-white-ivory">
              The luxury home for your cat
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center text-gray-ash">
              Exclusive experience, designed for feline comfort.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="mt-5  mb-10 text-gold-soft">Our Suites</h1>
        <hr />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-11/12 mx-auto my-4">
          {rooms.map((room: IRoom) => (
            <div key={room.id}>
              <Card room={room} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

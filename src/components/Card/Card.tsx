import Image from "next/image";
import Link from "next/link";
import { IRoomResponse } from "@/interfaces/IRoom";

const Card = ({ room }: { room: IRoomResponse }) => {
  return (
    <div className=" p-3 bg-black-dark rounded-lg shadow-md text-gold-soft w-auto">
      {/* Imagen */}
      <div className="relative w-full h-40 overflow-hidden rounded-md bg-gray-700">
        <Image
          src={room.img}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-base text-white truncate font-secondary">
            {room.name}
          </p>
          <p className="font-semibold text-sm text-green-olive font-secondary">
            ${room.price} USD
          </p>
        </div>
        <Link
          href={`rooms/${room.id}`}
          className="px-3 py-2 bg-gold-dark text-black-dark rounded-full font-secondary font-semibold text-xs transition-transform duration-300 hover:scale-105 hover:bg-gold-soft"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;

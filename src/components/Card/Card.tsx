import Image from "next/image";
import Link from "next/link";
import { IRoom } from "@/interfaces/IRoom";

const Card = ({ room }: { room: IRoom }) => {
  return (
    <div className="m-4 p-3 bg-black-dark rounded-lg shadow-md text-gold-soft w-72">
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

      {/* Información */}
      <div className="mt-3 flex items-center justify-between">
        {/* Nombre y precio */}
        <div className="flex flex-col">
          <p className="font-semibold text-base text-white truncate font-primary">
            {room.name}
          </p>
          <p className="font-semibold text-base text-green-olive font-secondary">
            ${room.price} USD
          </p>
        </div>

        {/* Botón */}
        <Link
          href={`rooms/${room.id}`}
          className="px-3 py-2 bg-gold-dark text-black-dark rounded-full font-medium text-xs transition-transform duration-300 hover:scale-105 hover:bg-gold-soft"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;

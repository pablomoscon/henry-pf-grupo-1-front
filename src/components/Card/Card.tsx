import Image from "next/image";
import Link from "next/link";
import { IRoom } from "@/interfaces/IRoom";

const Card = ({ room }: { room: IRoom }) => {
  return (
    <div className="p-3 bg-black-dark rounded-lg text-gold-soft">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
        <Image
          src={room.img}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="font-medium text-lg text-white-ivory font-primary mb-3">
          {room.name}
        </p>
        <Link
          href={`rooms/${room.id}`}
          className="inline-block px-4 py-2 button_gold text-sm rounded-md"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;

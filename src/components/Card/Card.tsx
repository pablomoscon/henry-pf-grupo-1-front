import Image from "next/image";
import Link from "next/link";
import { IRoom } from "@/interfaces/IRoom";

const Card = ({ room }: { room: IRoom }) => {
  return (
    <div className="m-6 p-4 bg-black-dark rounded-lg text-gold-soft">
      <Image
        src={room.imgs}
        alt={room.name}
        width={380}
        height={380}
        className="rounded-md"
      />
      <div className="mt-4 text-center">
        <p className="font-semibold text-xl text-white-ivory font-primary mb-4">
          {room.name}
        </p>

        <Link href={`rooms/${room.id}`} className="mx-auto button_gold text-sm">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;

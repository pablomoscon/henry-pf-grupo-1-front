import { getRoomById } from "@/services/roomService";
import { notFound } from "next/navigation";
import Detail from "@/components/Detail/Detail";

interface PageProps {
  params: {
    id: string;
  };
}

const Room = async ({ params }: PageProps) => {
  const { id } = await params;

  const roomFind = await getRoomById(parseInt(id));

  if (!roomFind) {
    return notFound();
  }

  return (
    <div>
      <h1 className=" text-gold-soft mb-6">{roomFind.name}</h1>
      <div>
        <Detail room={roomFind} />
      </div>
    </div>
  );
};

export default Room;

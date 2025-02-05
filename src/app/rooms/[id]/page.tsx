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

  const roomFind = await getRoomById(id);

  if (!roomFind) {
    return notFound();
  }

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url('/BannerHome.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Content */}
      <div className="relative flex items-center justify-center h-full">
        <div className="w-full max-w-5xl p-4">
          <Detail room={roomFind} />
        </div>
      </div>
    </div>
  );
};

export default Room;

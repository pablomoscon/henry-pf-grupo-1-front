import SuitesClient from "@/components/SuitesClient/SuitesClient";
import { getRooms } from "@/services/roomService";

const Suites = async () => {
  const rooms = await getRooms();

  return (
    <div
      id="our-suites"
      className="relative z-10 container pt-32 -mt-12 bg-black backdrop-blur-sm"
    >
      <SuitesClient initialRooms={rooms} />
    </div>
  );
};

export default Suites;

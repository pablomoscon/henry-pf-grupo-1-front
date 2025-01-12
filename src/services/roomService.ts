import { IRoom } from "@/interfaces/IRoom";
import rooms from "@/mocks/rooms";

export const getRooms = async (): Promise<IRoom[]> => {
  try {
    const res = await Promise.resolve(rooms);
    return res as IRoom[];
  } catch {
    return [];
  }
};

export const getRoomById = async (id: number): Promise<IRoom> => {
  const rooms = await getRooms();
  const roomFind = rooms.find((room) => room.id === id);
  return roomFind as IRoom;
};

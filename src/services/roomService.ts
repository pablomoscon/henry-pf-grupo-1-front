import { IRoom } from "@/interfaces/IRoom";
import { IRegisterRoomResponse } from "@/interfaces/IRoom";
import rooms from "@/mocks/rooms";

export const getRooms = async (): Promise<IRoom[]> => {
  try {
    const res = await Promise.resolve(rooms);
    return res as IRoom[];
  } catch {
    return [];
  }
};

export const getRoomById = async (id: number): Promise<IRoom | undefined> => {
  const rooms = await getRooms();
  return rooms.find((room) => room.id === id);
};

// Registrar nueva habitación
export const registerRoom = async (
  room: IRoom
): Promise<IRegisterRoomResponse> => {
  try {
    const rooms = await getRooms();
    const newId = rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1;
    const newRoom = { ...room, id: newId };
    rooms.push(newRoom);

    return {
      success: true,
      rooms,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error registering room",
    };
  }
};

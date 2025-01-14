import { IRoom } from "@/interfaces/IRoom";
/* import { IRegisterRoomResponse } from "@/interfaces/IRoom"; */

export const getRooms = async (): Promise<IRoom[]> => {
  const res = await fetch("http://localhost:3000/rooms?page=1&limit=15", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as IRoom[];
};

export const getRoomById = async (id: string): Promise<IRoom | undefined> => {
  const rooms = await getRooms();
  return rooms.find((room) => room.id === id);
};

// Registrar nueva habitación

export const registerRoom = async (room: IRoom) => {
  const res = await fetch("http://localhost:3000/rooms", {
    method: "POST",
    body: JSON.stringify(room),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

/* 
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
}; */

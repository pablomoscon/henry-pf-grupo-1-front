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
  const res = await fetch(`http://localhost:3000/rooms/${id}`, {
    cache: "no-store",
  }).catch(() => null);

  if (!res || !res.ok) return undefined;
  return (await res.json()) as IRoom;
};

// Registrar nueva habitación

export const registerRoom = async (roomData: IRoom, token: string) => {
  const formData = new FormData();

  formData.append("name", roomData.name);
  formData.append("description", roomData.description);
  formData.append("img", roomData.img);
  roomData.features.forEach((feature) => formData.append("features", feature)); 
  formData.append("number_of_cats", roomData.number_of_cats.toString());
  formData.append("price", roomData.price.toString());

  try {
    const response = await fetch(`http://localhost:3000/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in registerRoom:", error);
    throw error;
  }
};

// Filtrar habitaciones
export const filterRooms = async (
  checkInDate: string,
  checkOutDate: string,
  numberOfCats: string,
  minPrice: string,
  maxPrice: string
): Promise<IRoom[]> => {
  const params = new URLSearchParams({
    checkInDate,
    checkOutDate,
    numberOfCats,
    minPrice,
    maxPrice,
  });

  try {
    const res = await fetch(`http://localhost:3000/rooms/filters?${params}`);
    const data = await res.json();
    return data as IRoom[];
  } catch {
    return [];
  }
};

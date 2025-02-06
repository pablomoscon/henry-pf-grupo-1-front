import { IRoom } from "@/interfaces/IRoom";

export const getRooms = async (): Promise<IRoom[]> => {
  const res = await fetch("http://localhost:3000/rooms?page=1&limit=100", {
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

interface RoomDataToRegister {
  name: string;
  description: string;
  price: number;
  number_of_cats: number;
  img?: File;
  features?: string[];
}

export const registerRoom = async (
  roomData: RoomDataToRegister,
  token: string
) => {
  try {
    const formData = new FormData();

    // Agregar logs para debug
    console.log("Token:", token);
    console.log("Room data:", roomData);

    // Asegurarse de que todos los campos requeridos estén presentes
    formData.append("name", roomData.name);
    formData.append("description", roomData.description);
    formData.append("price", roomData.price.toString());
    formData.append("number_of_cats", roomData.number_of_cats.toString());
    if (roomData.img) {
      formData.append("img", roomData.img);
    }

    // Cambiar cómo se envían los features
    if (roomData.features && roomData.features.length > 0) {
      roomData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
    } else {
      formData.append("features", "[]");
    }

    const response = await fetch(`http://localhost:3000/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Error al crear la suite");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en registerRoom:", error);
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

export const updateRoom = async (
  id: string,
  roomData: RoomDataToRegister,
  token: string
) => {
  try {
    const formData = new FormData();

    formData.append("name", roomData.name);
    formData.append("description", roomData.description);
    formData.append("price", roomData.price.toString());
    formData.append("number_of_cats", roomData.number_of_cats.toString());

    // Manejar la imagen solo si hay una nueva
    if (roomData.img instanceof File) {
      formData.append("img", roomData.img);
    }

    // Manejar features de la misma manera que en registerRoom
    if (roomData.features && roomData.features.length > 0) {
      roomData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
    } else {
      formData.append("features", "[]");
    }

    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateRoom:", error);
    throw error;
  }
};

export const roomService = {
  async updateRoom(data: FormData, id: string, token: string): Promise<IRoom> {
    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update room");
    }

    return response.json();
  },

  async deleteRoom(id: string, token: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error deleting suite");
  },
};

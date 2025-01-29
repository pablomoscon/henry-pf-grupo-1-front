export interface IReserve {
  userId: string | undefined;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  catsIds: string[];
}

interface IRoomInReservation {
  id: string;
  name: string;
  img: string;
  description: string;
  price: string;
  available: boolean;
  deleted_at: string | null;
  number_of_cats: number;
  features: string[];
}

export interface IReservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  totalAmount: string;
  room: IRoomInReservation;
}

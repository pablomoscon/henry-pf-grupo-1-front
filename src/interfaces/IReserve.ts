import { UserData } from "./IUser";

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

interface IUserInReservation {
  id: string;
  name: string;
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
  user?: IUserInReservation;
  caretaker?: UserData | null;
}

export interface IReservationUpdate {
  id: string;
  room: Partial<IRoomInReservation>;
}

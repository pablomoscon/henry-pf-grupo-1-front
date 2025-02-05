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
}

export interface IReservationUpdate {
  id: string;
  room: Partial<IRoomInReservation>;
}

export interface ICaretaker {
  id: string;
  name?: string;
}
export interface IReservationEdit {
  id: string;
  checkIn: string;
  checkOut: string;
  totalAmount: string;
  status: string;
  roomName: string;
  cats: string[];
  caretakers?: ICaretaker[];
  payments: unknown[];
  userName: string;
}

export interface Caretaker {
  id: string;
  name: string;
}

export interface Reservation {
  id: string;
  caretakers: Caretaker[];
}

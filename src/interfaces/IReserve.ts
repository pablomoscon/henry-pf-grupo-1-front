export interface IReserve {
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  catsIds: string[];
}

export interface IReservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: string;
  room: {
    id: string;
    name: string;
  };
}

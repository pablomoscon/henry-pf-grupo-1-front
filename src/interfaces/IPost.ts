export interface IUser {
  id: string;
  name: string;
  email: string;
  customerId: string;
  phone: string;
  deleted_at: string | null;
  address: string;
  role: string;
  status: string;
  createdAt: string;
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
}

export interface IPost {
  id: string;
  media_url: string;
  type: string;
  uploaded_at: string | null;
  deleted_at: string | null;
  body: string;
  timestamp: string;
  sender: IUser;
  receivers: IUser[];
  reservation: IReservation;
  isRead: boolean;
}

export interface IPostSend {
  sender: string;
  receiver: string;
  file?: File;
  body: string;
  reservationId: string;
  caretakerName: string;
}

/* export interface IPosRecived {
  id?: string;
  file?: File;
  type: string;
  uploaded_at: string;
  body: string;
  timestamp: string;
  sender_id: string;
  reserved_id: string;
  reservationId: string;
} */

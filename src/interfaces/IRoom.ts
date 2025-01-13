export interface IRoom {
  id?: number;
  name: string;
  description: string;
  imgs: string;
  features: string[];
  number_of_cats: number;
  price: number;
}

export interface IRegisterRoomResponse {
  success: boolean;
  message?: string;
  rooms?: IRoom[];
}

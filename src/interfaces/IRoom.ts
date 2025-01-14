export interface IRoom {
  id?: string;
  name: string;
  description: string;
  img: string;
  features: string[];
  number_of_cats: number;
  price: number;
}

export interface IRegisterRoomResponse {
  success: boolean;
  message?: string;
  rooms?: IRoom[];
}

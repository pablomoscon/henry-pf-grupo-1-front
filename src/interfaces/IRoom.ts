export interface IRoom {
  id?: string;
  name: string;
  description: string;
  img: File;
  features: string[];
  number_of_cats: number;
  price: number;
}

export interface IRoomResponse {
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

export interface FormValues {
  name: string;
  description: string;
  img: File | null;
  features: {
    hidingPlace: boolean;
    hammocks: boolean;
    scratchers: boolean;
    suspensionBridges: boolean;
  };
  numberOfCats: string;
  price: string;
}

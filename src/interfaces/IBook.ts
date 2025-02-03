export interface IBook {
  id?: string;
  checkInDate?: string;
  checkOutDate?: string;
  catsIds?: string[];
  numCat?: number;
}

export interface ICatUser {
  id: string;
  name: string;
}

export interface IBookCaretaker {
  userId: string;
  userName: string;
  catsNames: string[];
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
}

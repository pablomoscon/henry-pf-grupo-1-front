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

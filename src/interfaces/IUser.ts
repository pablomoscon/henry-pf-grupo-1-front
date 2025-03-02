import { Reservation } from "./IReserve";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  customerId: string;
  name: string;
  address: string;
  phone: string;
  confirmPassword: string;
}

export interface LoginResponse {
  success: string;
  response: Response;
  user: UserData;
}

interface Response {
  token: string;
  user: UserData;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string;
  address: string;
  customerId: string;
  reservations?: Reservation[];
}

export interface User {
  login: boolean;
  user: UserData;
  token: string;
}

export interface AuthResponse {
  url?: string;
  token?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    phone?: string;
    address?: string;
    customerId?: string;
  };
}

export interface GoogleUser {
  response: {
    user: UserData;
    token: string;
  } | null;
}

export interface UserContextType {
  user: GoogleUser | null;
  setUser: (user: GoogleUser | null) => void;
  isLogged: boolean;
  updateUser: (userData: Partial<UserData>) => void;
  login: (data: { token: string }) => Promise<void>;
  logout: () => void;
}

export interface GoogleAuthResponse {
  url: string;
}

export interface GoogleCallbackResponse {
  token: string;
  user: UserData;
}

export interface ChangePasswordData {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
}

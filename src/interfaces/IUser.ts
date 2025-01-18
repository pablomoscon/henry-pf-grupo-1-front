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
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string;
  address: string;
  customerId: string;
}

export interface User {
  login: boolean;
  user: UserData;
  token: string;
}

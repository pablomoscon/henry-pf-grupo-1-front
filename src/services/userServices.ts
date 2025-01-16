import { UserLogin, UserRegister, LoginResponse } from "@/interfaces/IUser";

export const userRegister = async (data: UserRegister) => {
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  return res.json();
};

export const userLogin = async (data: UserLogin): Promise<LoginResponse> => {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  return res.json();
};

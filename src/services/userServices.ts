import {
  UserLogin,
  UserRegister,
  LoginResponse,
  UserData,
  ChangePasswordData,
  ChangePasswordResponse,
} from "@/interfaces/IUser";

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

export const updateUserProfile = async (
  userData: Partial<UserData>,
  id: string,
  token: string
) => {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
};

export const changePassword = async (
  data: ChangePasswordData,
  userId: string,
  token: string
): Promise<ChangePasswordResponse> => {
  const res = await fetch(
    `http://localhost:3000/credentials/${userId}?token=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const responseData = await res.json();
  console.log("Server response:", responseData);

  if (!res.ok) {
    throw new Error("Failed to change password");
  }

  return responseData;
};

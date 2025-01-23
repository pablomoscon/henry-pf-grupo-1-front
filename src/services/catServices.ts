import { ICat, CatFormData, CatRegisterRequest } from "@/interfaces/ICat";

export const getCats = async (): Promise<ICat[]> => {
  const res = await fetch("http://localhost:3000/cats", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICat[];
};

export const catRegister = async (formData: CatFormData) => {
  const { userId, ...catData } = formData;
  const requestBody: CatRegisterRequest = {
    ...catData,
    userId
  };

  
  try {
    const res = await fetch("http://localhost:3000/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("4. Error del servidor:", errorText);
      throw new Error(`Failed to register cat: ${res.statusText}`); 
    }

    const responseData = await res.json();
    
    return responseData;
  } catch (error) {
    console.error("6. Error en catRegister:", error);
    throw error;
  }
};

export const getCatsId = async (id: string): Promise<ICat | undefined> => {
  const cats = await getCats();
  return cats.find((cat) => cat.id === id);
};



export const updateCat = async (catData: ICat, id: string) => {
  const res = await fetch(`http://localhost:3000/cats/${id}`, {  
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catData),
  });
  if (!res.ok) {
    throw new Error("Failed to update cat's profile");
  }

  return res.json();
};

export const getCatsUser = async (id: string): Promise<ICat[]> => {
  const res = await fetch(`http://localhost:3000/users/cats/${id}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICat[];
};


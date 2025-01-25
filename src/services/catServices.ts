import { ICat, CatFormData, ICatGet } from "@/interfaces/ICat";

export const getCats = async (): Promise<ICatGet[]> => {
  const res = await fetch("http://localhost:3000/cats", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICatGet[];
};

export const catRegister = async (formData: CatFormData) => {
  const { userId, photo, ...catData } = formData;

  const formDataToSend = new FormData();

  formDataToSend.append("photo", photo);
  formDataToSend.append("userId", userId);
  formDataToSend.append("name", catData.name);
  formDataToSend.append("dateOfBirth", catData.dateOfBirth);
  formDataToSend.append("isNeutered", String(catData.isNeutered));
  formDataToSend.append("weight", catData.weight);
  formDataToSend.append("personality", catData.personality);
  formDataToSend.append(
    "getsAlongWithOtherCats",
    catData.getsAlongWithOtherCats
  );
  formDataToSend.append("food", catData.food);
  formDataToSend.append("medication", catData.medication);
  formDataToSend.append("behaviorAtVet", catData.behaviorAtVet);
  formDataToSend.append(
    "vaccinationsAndTests",
    JSON.stringify(catData.vaccinationsAndTests)
  );

  try {
    console.log("Sending request with FormData", formDataToSend);
    const res = await fetch("http://localhost:3000/cats", {
      method: "POST",
      body: formDataToSend,
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

export const getCatsId = async (id: string): Promise<ICatGet | undefined> => {
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

export const getCatsUser = async (id: string): Promise<ICatGet[]> => {
  const res = await fetch(`http://localhost:3000/users/cats/${id}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICatGet[];
};

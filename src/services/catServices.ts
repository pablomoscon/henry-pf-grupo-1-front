import { ICat, CatFormData } from "@/interfaces/ICat";

export const getCats = async (token?: string): Promise<ICat[]> => {
  try {
    const res = await fetch("http://localhost:3000/cats", {
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const catRegister = async (formData: CatFormData, token?: string) => {
  const { userId, photoFile, ...catData } = formData;
  const formDataToSend = new FormData();

  if (photoFile && photoFile.size > 0) {
    formDataToSend.append("photoFile", photoFile);
  }

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
    const res = await fetch("http://localhost:3000/cats", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formDataToSend,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to register cat: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en catRegister:", error);
    throw error;
  }
};

export const getCatsId = async (id: string): Promise<ICat | undefined> => {
  const cats = await getCats();
  return cats.find((cat) => cat.id === id);
};

export const updateCat = async (
  formData: CatFormData,
  id: string,
  token?: string
) => {
  const { photoFile, ...catData } = formData;
  const formDataToSend = new FormData();

  if (photoFile && photoFile.size > 0) {
    formDataToSend.append("photoFile", photoFile);
  }

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
    const res = await fetch(`http://localhost:3000/cats/${id}`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formDataToSend,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to update cat: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en updateCat:", error);
    throw error;
  }
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

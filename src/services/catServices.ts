import { ICat, CatFormData } from "@/interfaces/ICat";
import { ICatUser } from "@/interfaces/IBook";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

export const getCats = async (token?: string): Promise<ICat[]> => {
  try {
    const res = await fetchWithInterceptor(`${API_URL}/cats`, {
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // Verificación de respuesta nula o error
    if (!res || !res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
};

export const getCatsUser = async (
  id: string,
  token: string | undefined
): Promise<ICatUser[]> => {
  try {
    const res = await fetchWithInterceptor(`${API_URL}/users/cats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificación de respuesta nula o error
    if (!res || !res.ok) {
      return [];
    }

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
  formDataToSend.append("getsAlongWithOtherCats", catData.getsAlongWithOtherCats);
  formDataToSend.append("food", catData.food);
  formDataToSend.append("medication", catData.medication);
  formDataToSend.append("behaviorAtVet", catData.behaviorAtVet);
  formDataToSend.append("vaccinationsAndTests", JSON.stringify(catData.vaccinationsAndTests));

  try {
    const res = await fetchWithInterceptor(`${API_URL}/cats`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formDataToSend,
    });

    // Verificar si la respuesta es null debido a un 401
    if (!res) {
      console.error("Token expirado o problema de red en catRegister");
      return null; // O maneja la redirección aquí
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to register cat: ${res.statusText ?? 'Unknown error'}`);
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

  if (
    photoFile instanceof File &&
    photoFile.size > 0 &&
    photoFile.name !== ""
  ) {
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
    const res = await fetchWithInterceptor(`${API_URL}/cats/${id}`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formDataToSend,
    });

    if (!res || !res.ok) {
      if (res?.status === 401) {
        return;
      }

      const errorText = await res?.text();
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to update cat: ${res?.statusText ?? 'Unknown error'}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en updateCat:", error);
    throw error; 
  }
};

import posts from "@/mocks/post";
import { IPostSend } from "@/interfaces/IPost";
import { IPost } from "@/interfaces/IPost";
import { API_URL } from "../../envs";
import { fetchWithInterceptor } from "./fetchInterceptor";

// Obtener publicaciones mockeadas
export const getPosts1 = () => {
  return posts;
};

// Obtener publicaciones desde la API
export const getPosts = async (idUser: string, token?: string): Promise<IPost[]> => {
  try {
    const res = await fetchWithInterceptor(
      `${API_URL}/messages/received/${idUser}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res || !res.ok) {
      console.error("Error fetching posts.");
      return [];
    }

    const postsData: IPost[] = await res.json();
    return postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];  // Devuelve un array vacío en caso de error
  }
};

// Registrar una nueva publicación
export const registerPost = async (
  formData: IPostSend,
  token: string | undefined
) => {
  const { sender, receiver, file, body, reservationId } = formData;

  const formDataToSend = new FormData();

  if (file && file.size > 0) {
    formDataToSend.append("file", file);
  }
  console.log("media_url attached", file);

  formDataToSend.append("sender", sender);
  formDataToSend.append("receiver", receiver);
  formDataToSend.append("body", body);
  formDataToSend.append("reservationId", reservationId);

  try {
    const res = await fetchWithInterceptor(`${API_URL}/messages/posts`, {
      method: "POST",
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificar si la respuesta es nula o no válida
    if (!res || !res.ok) {
      const errorText = await res?.text();  // Usar el operador de encadenamiento opcional
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to register post: ${res?.statusText}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error en postRegister:", error);
    throw error;  // Lanza el error para que pueda ser manejado en otro nivel si es necesario
  }
};

export const markPostsAsRead = async (postIds: string[], token?: string) => {
  try {
    const res = await fetchWithInterceptor(`${API_URL}/messages/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postIds, isRead: true }),
    });

    if (!res || !res.ok) {
      console.error("Error marking posts as read.");
    }
  } catch (error) {
    console.error("Error in markPostsAsRead:", error);
  }
};

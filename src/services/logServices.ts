import posts from "@/mocks/post";
import { IPostSend } from "@/interfaces/IPost";
import { IPost } from "@/interfaces/IPost";

export const getPosts1 = () => {
  return posts;
};

export const getPosts = async (idUser: string): Promise<IPost[]> => {
  const res = await fetch(`http://localhost:3000/messages/received/${idUser}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as IPost[];
};

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
    const res = await fetch("http://localhost:3000/messages/posts", {
      method: "POST",
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error del servidor:", errorText);
      throw new Error(`Failed to register post: ${res.statusText}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error en podtRegister:", error);
    throw error;
  }
};

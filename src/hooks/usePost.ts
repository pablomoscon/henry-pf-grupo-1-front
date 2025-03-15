import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../../envs";

const useSocket = (userId: string | undefined) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Establecer la conexión con el servidor WebSocket
      const socketConnection = io(`${API_URL}/messages/posts`, {
      transports: ["websocket"],
      withCredentials: true,
    });

    // Cuando se conecta, registramos al usuario
    socketConnection.on("connect", () => {
      console.log("Conectado al WebSocket");
      socketConnection.emit("registerUser", userId); // Registrar al usuario
    });

    // Escuchar eventos de conexión y desconexión de usuarios
    socketConnection.on("userConnected", (connectedUsers: string[]) => {
      console.log("Usuarios conectados:", connectedUsers);
    });

    socketConnection.on("userDisconnected", (connectedUsers: string[]) => {
      console.log("Usuarios desconectados:", connectedUsers);
    });

    // Escuchar el evento de nuevos posts
    socketConnection.on("newPost", (newPost) => {
      console.log("Nuevo post recibido:", newPost);
      // Aquí puedes gestionar la actualización de los posts si es necesario
    });

    setSocket(socketConnection);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socketConnection.disconnect();
      console.log("Desconectado del WebSocket");
    };
  }, [userId]);

  return socket;
};

export default useSocket;

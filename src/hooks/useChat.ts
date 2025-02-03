import { useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ChatContext } from "@/contexts/chatContext";
import { ChatMessage } from "@/interfaces/IChat";

let socket: Socket | null = null;

export const useChat = (chatId: string, userId: string) => {
  const { addMessage } = useContext(ChatContext);

  useEffect(() => {
    if (!chatId || !userId) {
      console.log("Missing required data:", { chatId, userId });
      return;
    }

    console.log("Initializing socket connection:", {
      chatId,
      userId,
    });

    socket = io("http://localhost:3000/messages/chat", {
      transports: ["websocket"],
      query: {
        clientChatRoomId: chatId,
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Unirse a la sala de chat
    socket.emit("joinRoom", {
      clientChatRoomId: chatId,
      currentUser: { id: userId },
    });

    // Escuchar mensajes nuevos
    socket.on("receive_message", (message: ChatMessage) => {
      console.log("Received message:", message);
      addMessage({
        body: message.body,
        sender: message.senderName,
        isCurrentUser: false,
      });
    });

    // Limpiar al desmontar
    return () => {
      console.log("Cleaning up socket connection");
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [chatId, userId, addMessage]);

  const sendMessage = (message: string) => {
    if (socket && message.trim()) {
      socket.emit("send_message", {
        currentUser: userId,
        body: message,
        clientChatRoom: chatId,
      });
    }
  };

  return { sendMessage };
};

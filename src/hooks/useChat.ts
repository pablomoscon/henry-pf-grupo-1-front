import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatMessage } from "@/interfaces/IChat";

export const useChat = (chatId: string, user: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId || !user?.id) {
      return;
    }

    console.log("Initializing socket connection:", { chatId, user });

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000/messages/chat", {
        transports: ["websocket"],
        query: { clientChatRoomId: chatId },
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected successfully:", socketRef.current?.id);
        socketRef.current?.emit("joinRoom", {
          clientChatRoomId: chatId,
          currentUser: { id: user.id },
        });
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socketRef.current.on("receive_message", (message: ChatMessage) => {
        console.log("Received message:", message);

        const timestamp = message.timestamp || new Date().toISOString();

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderName: message.senderName || "Unknown User",
            body: message.body,
            timestamp: timestamp,
          },
        ]);
      });

      socketRef.current.on("initial_messages", (data: any) => {
        console.log("Initial messages:", data.messages);

        const updatedMessages = data.messages.map((msg: ChatMessage) => {
          console.log("Processing message:", msg);
          return {
            ...msg,
          };
        });

        setMessages(updatedMessages);
      });

      socketRef.current.on("message_error", (data) => {
        console.log("Error received from server:", data);
        setErrorMessage(data.message);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatId, user?.id, user]);

  const sendMessage = useCallback(
    (message: string, timestamp: string) => {
      if (message.trim() && chatId && user?.id) {
        const messageData = {
          currentUser: user.id,
          body: message,
          clientChatRoom: chatId,
          senderName: user.name,
          timestamp: timestamp,
        };

        socketRef.current?.emit("send_message", messageData);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderName: user.name,
            body: message,
            timestamp: timestamp,
            currentUser: true,
          },
        ]);
      }
    },
    [chatId, user]
  );

  return { messages, sendMessage, errorMessage };
};

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatMessage, ChatUser } from "@/interfaces/IChat";
import { API_URL } from "../../envs";

export const useChat = (chatId: string, user: ChatUser | null | undefined) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId || !user?.id) {
      console.log("Missing required data:", { chatId, user });
      return;
    }

    console.log("Initializing socket connection:", { chatId, user });

    if (!socketRef.current) {
      socketRef.current = io(`${API_URL}/messages/chat`, {
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
            currentUser: false,
            receiversNames: message.receiversNames || [],
          },
        ]);
      });

      socketRef.current.on(
        "initial_messages",
        (data: { messages: ChatMessage[] }) => {
          console.log("Initial messages:", data.messages);

          const updatedMessages = data.messages.map((msg: ChatMessage) => {
            console.log("Processing message:", msg);
            return {
              ...msg,
            };
          });

          setMessages(updatedMessages);
          setLoading(false);
        }
      );

      socketRef.current.on("message_error", (data) => {
        console.log("Error received from server:", data);
        setErrorMessage(data.message);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatId, user?.id]);

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
            receiversNames: [],
          },
        ]);
      }
    },
    [chatId, user]
  );

  return { messages, sendMessage, errorMessage, loading };
};

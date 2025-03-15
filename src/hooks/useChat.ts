import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatMessage, ChatUser } from "@/interfaces/IChat";
import { API_URL } from "../../envs";

export const useChat = (chatId: string, user: ChatUser | null | undefined) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const lastChatId = useRef(chatId);
  const lastUserId = useRef(user?.id);

  useEffect(() => {
    // If chatId or user ID is missing, stop execution
    if (!chatId || !user?.id || (lastChatId.current === chatId && lastUserId.current === user.id)) {
      return;
    }

    // Store the current chatId and user ID for comparison
    lastChatId.current = chatId;
    lastUserId.current = user.id;

    // Check if socket is already initialized and connected, if yes, skip re-connection
    if (socketRef.current && socketRef.current.connected) {
      return;
    }

    // Establish socket connection only if not already established
      if (!socketRef.current) {
        socketRef.current = io(`${API_URL}/messages/chat`, {
          transports: ["websocket"],
        });

      // Listen for successful connection and emit joinRoom event
      socketRef.current.on("connect", () => {
        console.log("Socket connected successfully:", socketRef.current?.id);
        socketRef.current?.emit("joinRoom", { chatRoomId: chatId, currentUser: user });
      });

      socketRef.current.on("message_error", (data) => {
        console.log("Error received from server:", data);
        setErrorMessage(data.message);
      });

      // Listen for received messages
      socketRef.current.on("receive_message", (message: ChatMessage) => {
        console.log("Received message:", message);
        // Update messages state with new message
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderName: message.senderName || "Unknown User",
            body: message.body,
            timestamp: message.timestamp || new Date().toISOString(),
            currentUser: message.senderName === user.name,
            receiversNames: message.receiversNames || [],
          },
        ]);
      });

      // Listen for initial messages from the server
      socketRef.current.on("initial_messages", (data: { messages: ChatMessage[] }) => {
        console.log("Initial messages:", data.messages);
        // Set the initial messages state
        setMessages(data.messages.map((msg: ChatMessage) => ({ ...msg })));
      });
    }

    // Cleanup the socket connection when the component unmounts or dependencies change
    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message"); // Remove specific event listeners
        socketRef.current.off("initial_messages"); // Remove specific event listeners
        socketRef.current.removeAllListeners(); // Remove all event listeners
        socketRef.current.disconnect(); // Disconnect the socket
        socketRef.current = null; // Reset the reference
      }
    };
  }, [chatId, user?.id]); // Dependencies to reconnect only when chatId or user.id change

  const sendMessage = useCallback(
    (message: string, timestamp: string) => {
      if (message.trim() && chatId && user?.id) {
        const messageData = {
          currentUser: user.id,
          body: message,
          chatRoom: chatId,
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
    [chatId, user?.id] // Dependencies to send message only when chatId or user.id change
  );

  return { messages, sendMessage, errorMessage };
};

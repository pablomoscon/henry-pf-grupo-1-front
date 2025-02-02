"use client";

import { createContext, useState } from "react";
import { Message, ChatContextType } from "@/interfaces/IChat";

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    // Mensajes mockeados para desarrollo
    {
      id: "1",
      body: "Hola, ¿cómo está mi gatito?",
      sender: "Cliente",
      timestamp: new Date(),
      isCurrentUser: true,
    },
    {
      id: "2",
      body: "¡Hola! Tu gatito está muy bien, acaba de comer",
      sender: "Cuidador",
      timestamp: new Date(),
      isCurrentUser: false,
    },
  ]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

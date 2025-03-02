'use client';

import { createContext, useState } from 'react';
import { Message, ChatContextType } from '@/interfaces/IChat';

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
  chatId: null,
  setChatId: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
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
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        chatId,
        setChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

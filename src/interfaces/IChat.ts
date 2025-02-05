export interface Message {
  id: string;
  body: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
}

export interface ChatMessage {
  body: string;
  senderName: string;
  timestamp: Date;
  currentUser?: boolean;
}

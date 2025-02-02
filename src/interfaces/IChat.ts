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
}

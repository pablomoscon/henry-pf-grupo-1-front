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
  timestamp: string | Date;
  currentUser?: boolean;
  receiversNames?: string[];
}

export interface ChatUser {
  id: string;
  name: string;
}

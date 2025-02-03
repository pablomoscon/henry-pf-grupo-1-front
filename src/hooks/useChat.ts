import { useEffect, useRef, useContext, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatContext } from '@/contexts/chatContext';
import { ChatMessage } from '@/interfaces/IChat';
import { UserData } from '../interfaces/IUser';
import { timeStamp } from 'console';

export const useChat = (chatId: string, user: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId || !user?.id) {
      console.log("Missing required data:", { chatId, user });
      return;
    }

    console.log("Initializing socket connection:", { chatId, user });

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000/messages/chat", {
        transports: ["websocket"],
        query: { clientChatRoomId: chatId },
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected successfully", socketRef.current?.id);
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

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderName: message.senderName || 'Unknown User',
            body: message.body
          },
        ]);
      });

      socketRef.current.on('initial_messages', (data: any) => {
        console.log('Mensajes iniciales:', data.messages);

        const updatedMessages = data.messages.map((msg: ChatMessage) => {
          console.log('Procesando mensaje:', msg);
          return {
            ...msg
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
  }, [chatId, user?.id]);

  const sendMessage = useCallback((message: string) => {
    if (message.trim() && chatId && user?.id) {
      const messageData = {
        currentUser: user.id,
        body: message,
        clientChatRoom: chatId,
        senderName: user.name
      };
      socketRef.current?.emit('send_message', messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderName: user.name,
          body: message,
          currentUser: true
        },
      ]);
    }
  }, [chatId, user]);

  return { messages, sendMessage, errorMessage };
};
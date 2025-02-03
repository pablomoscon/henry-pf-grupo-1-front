"use client";

import { useContext, useState, useEffect } from "react";
import { ChatContext } from "@/contexts/chatContext";
import { useChat } from "@/hooks/useChat";
import { UserContext } from "@/contexts/userContext";
import { useParams } from "next/navigation";

const ClientChat = () => {
  const { messages, addMessage, currentChatId, setCurrentChatId } =
    useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const params = useParams();

  // Obtener chatId de los parámetros de la URL
  useEffect(() => {
    if (params.chatId) {
      console.log("ChatID from URL:", params.chatId);
      setCurrentChatId(params.chatId as string);
    }
  }, [params.chatId, setCurrentChatId]);

  // Log para verificar la información del usuario
  useEffect(() => {
    console.log("Current user:", user?.response?.user);
  }, [user]);

  // Inicializar el chat con Socket.IO
  const { sendMessage } = useChat(
    currentChatId || "",
    user?.response?.user?.id || ""
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    console.log("Sending message:", {
      body: newMessage,
      sender: user?.response?.user?.name,
      chatId: currentChatId,
    });

    // Enviar mensaje a través de Socket.IO
    sendMessage(newMessage);

    // Agregar mensaje al estado local
    addMessage({
      body: newMessage,
      sender: user?.response?.user?.name || "Cliente",
      isCurrentUser: true,
    });

    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-4xl h-[90%] mx-4 bg-black-dark rounded-lg shadow-lg border border-gray-700 flex flex-col">
        <h2 className="text-2xl text-gold-soft p-4 border-b border-gray-700">
          Chat with the Caretaker of my Kitty
        </h2>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isCurrentUser
                    ? "bg-gold-soft text-black-dark"
                    : "bg-gray-700 text-white-basic"
                }`}
              >
                <p className="text-sm font-bold">{message.sender}</p>
                <p>{message.body}</p>
                <p className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Container */}
        <div className="p-4 border-t border-gray-700 bg-black-dark mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-gray-700 text-white-basic rounded-lg px-4 py-2"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-gold-soft text-black-dark px-4 py-2 rounded-lg hover:bg-gold-dark transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;

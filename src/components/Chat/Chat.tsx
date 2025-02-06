"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "@/contexts/chatContext";
import { UserContext } from "@/contexts/userContext";
import { useChat } from "@/hooks/useChat";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { currentChatId, setCurrentChatId } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const idFromUrl = pathParts[pathParts.length - 1];
    setCurrentChatId(idFromUrl);
  }, [setCurrentChatId]);

  const { messages, sendMessage, errorMessage } = useChat(
    currentChatId || "",
    user?.response?.user
      ? {
          id: user.response.user.id || "",
          name: user.response.user.name || "",
        }
      : null
  );

  useEffect(() => {
    console.log("Current user:", user?.response?.user);
  }, [user]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toISOString();

    console.log("Sending message:", {
      body: newMessage,
      sender: user?.response?.user?.name,
      chatId: currentChatId,
      timestamp: timestamp,
    });

    sendMessage(newMessage, timestamp);
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-4xl h-[90%] mx-2 bg-black-dark rounded-lg shadow-lg border border-gray-700 flex flex-col">
        <h2 className="text-2xl text-gold-soft p-4 border-b border-gray-700">
          Chat
        </h2>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div className="bg-red-600 text-white p-2 text-center rounded-md mx-4">
            {errorMessage}
          </div>
        )}

        {/* Contenedor de mensajes con scroll solo dentro y smooth scroll */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto m-4 p-4 space-y-4"
          style={{
            maxHeight: "calc(100% - 100px)",
            scrollBehavior: "smooth",
          }}
        >
          {messages.map((message, index) => {
            const isSender =
              message.senderName === (user?.response?.user?.name || "");
            const isReceiver =
              Array.isArray(message.receiversNames) &&
              message.receiversNames.includes(user?.response?.user?.name || "");

            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`min-w-[20%] rounded-lg p-3 me-2 ms-2 ${
                    isSender
                      ? "bg-gold-soft text-black-dark"
                      : isReceiver
                      ? "bg-green-olive text-white-basic"
                      : "bg-gray-700 text-white-basic"
                  }`}
                >
                  <p className="text-m font-bold">{message.senderName}</p>
                  <p>{message.body}</p>
                  <p className="text-sm opacity-70">
                    {message.timestamp
                      ? new Date(message.timestamp).toLocaleTimeString()
                      : "Invalid Time"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contenedor de input para escribir el mensaje */}
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

export default Chat;

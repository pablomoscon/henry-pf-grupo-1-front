"use client";

import { useContext, useState } from "react";
import { ChatContext } from "@/contexts/chatContext";

const ClientChat = () => {
  const { messages, addMessage } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    addMessage({
      body: newMessage,
      sender: "Cliente",
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

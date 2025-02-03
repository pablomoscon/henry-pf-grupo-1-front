'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { ChatContext } from '@/contexts/chatContext';
import { UserContext } from '@/contexts/userContext';
import { useChat } from '@/hooks/useChat';

const ClientChat = () => {
  const { currentChatId, setCurrentChatId } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage } = useChat(
    currentChatId || '',
    user?.response?.user
  );

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const idFromUrl = pathParts[pathParts.length - 1];
    setCurrentChatId(idFromUrl);
  }, []);

  useEffect(() => {
    console.log('Current user:', user?.response?.user);
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toISOString();

    console.log('Sending message:', {
      body: newMessage,
      sender: user?.response?.user?.name,
      chatId: currentChatId,
      timestamp: timestamp,
    });

    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className='h-[calc(100vh-96px)] flex items-center justify-center bg-black-dark'>
      <div className='w-full max-w-4xl h-[90%] mx-4 bg-black-dark rounded-lg shadow-lg border border-gray-700 flex flex-col'>
        <h2 className='text-2xl text-gold-soft p-4 border-b border-gray-700'>
          Chat with the Caretaker of my Kitty
        </h2>

        {/* Chat Messages Container */}
        <div className='flex-1 overflow-y-auto m-6 p-4 space-y-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.senderName === user?.response?.user?.name
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderName === user?.response?.user?.name
                    ? 'bg-gold-soft text-black-dark'
                    : message.receiversNames.includes(
                        user?.response?.user?.name
                      )
                    ? 'bg-gray-700 text-white-basic'
                    : 'bg-yellow-500 text-black-dark'
                }`}
              >
                <p className='text-sm font-bold'>{message.senderName}</p>
                <p>{message.body}</p>
                <p className='text-xs opacity-70'>
                  {message.timestamp
                    ? new Date(message.timestamp).toLocaleTimeString()
                    : 'Invalid Time'}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className='p-4 border-t border-gray-700 bg-black-dark mt-auto'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className='flex-1 bg-gray-700 text-white-basic rounded-lg px-4 py-2'
              placeholder='Type your message...'
            />
            <button
              onClick={handleSend}
              className='bg-gold-soft text-black-dark px-4 py-2 rounded-lg hover:bg-gold-dark transition-colors'
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

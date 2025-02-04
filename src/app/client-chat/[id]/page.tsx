import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import ClientLayout from '@/components/ClientLayout/ClientLayout';
import { ChatProvider } from '@/contexts/chatContext';
import Chat from '@/components/Chat/Chat';

const ChatPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ChatProvider>
          <Chat/>
        </ChatProvider>
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default ChatPage;

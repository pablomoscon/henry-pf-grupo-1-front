import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Chat from '@/components/Chat/Chat';
import { ChatProvider } from '@/contexts/chatContext';

const CaretakerChatPage = () => {
  return (
    <ProtectedRoute>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </ProtectedRoute>
  );
};

export default CaretakerChatPage;

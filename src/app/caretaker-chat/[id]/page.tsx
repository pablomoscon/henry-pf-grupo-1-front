import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Chat from "@/components/Chat/Chat";
import { ChatProvider } from "@/contexts/chatContext";
import CaretakerChatLayout from "@/components/CaretakerChatLayout/CaretakerChatLayout";

const CaretakerChatPage = () => {
  return (
    <ProtectedRoute>
      <CaretakerChatLayout>
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </CaretakerChatLayout>
    </ProtectedRoute>
  );
};

export default CaretakerChatPage;

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import ClientChat from "@/components/ClientChat/ClientChat";
import { ChatProvider } from "@/contexts/chatContext";

const ClientChatPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ChatProvider>
          <ClientChat />
        </ChatProvider>
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default ClientChatPage;

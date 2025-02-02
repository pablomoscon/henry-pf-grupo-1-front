import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import ClientFeed from "@/components/ClientFeed/ClientFeed";

const ClientFeedPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ClientFeed />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default ClientFeedPage;

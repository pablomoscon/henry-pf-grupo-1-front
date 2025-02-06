import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import ClientProfile from "@/components/ClientProfile/ClientProfile";

const MyProfilePage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ClientProfile />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default MyProfilePage;

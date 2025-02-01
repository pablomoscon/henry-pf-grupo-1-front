import ClientProfile from "../../components/ClientProfile/ClientProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ClientProfile />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;

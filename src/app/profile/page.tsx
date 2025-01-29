import ClientProfile from "../../components/ClientProfile/ClientProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <ClientProfile />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

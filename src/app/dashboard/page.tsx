import ClientProfile from "../../components/ClientProfile/ClientProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute roles={["admin", "caretaker", "customer"]}>
      <div>
        <ClientProfile />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

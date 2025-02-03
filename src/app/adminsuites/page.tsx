import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import SuitesManager from "@/components/SuitesManager/SuitesManager";

const SuitesPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SuitesManager />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SuitesPage;

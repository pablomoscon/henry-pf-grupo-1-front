import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import CaretakerManager from "@/components/CaretakerManager/CaretakerManager";

const CaretakersPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CaretakerManager />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default CaretakersPage;

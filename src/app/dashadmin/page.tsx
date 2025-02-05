import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { EditReservationManager } from "@/components/EditReservationManager/EditReservationManager";

const ReservationsPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <EditReservationManager />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default ReservationsPage;

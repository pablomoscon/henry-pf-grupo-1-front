import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import CaretakerManager from "@/components/CaretakerManager/CaretakerManager";
import UserManager from "@/components/UserManager/UserManager";
import SuitesManager from "@/components/SuitesManager/SuitesManager";
import ReservationsManager from "@/components/ReservationsManager/ReservationsManager";

const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div>
        <ReservationsManager />
        <UserManager />
        <CaretakerManager />
        <SuitesManager />
      </div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

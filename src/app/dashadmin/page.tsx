import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import CaretakerManager from "@/components/CaretakerManager/CaretakerManager";
import UserManager from "@/components/UserManager/UserManager";
import SuitesManager from "@/components/SuitesManager/SuitesManager";

const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div>
        <UserManager />
        <CaretakerManager />
        <SuitesManager />
      </div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

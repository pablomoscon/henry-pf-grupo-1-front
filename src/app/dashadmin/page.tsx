import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import SuitesForm from "@/components/SuitesForm/SuitesForm";
import CaretakerManager from "@/components/CaretakerManager/CaretakerManager";
const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div>
        <CaretakerManager />
        <SuitesForm />
      </div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

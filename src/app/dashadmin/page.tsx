import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import SuitesForm from "@/components/SuitesForm/SuitesForm";
const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div>
        <SuitesForm />
      </div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

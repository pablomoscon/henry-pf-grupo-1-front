import CaretakerDash from "@/components/CaretakerDash/CaretakerDash";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const DashCaretaker = () => {
  return (
    <ProtectedRoute>
      <CaretakerDash />
    </ProtectedRoute>
  );
};

export default DashCaretaker;

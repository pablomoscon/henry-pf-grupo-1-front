import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import SuitesForm from "@/components/SuitesForm/SuitesForm";
import CaretakerManager from "@/components/CaretakerManager/CaretakerManager";
//import UserManager from "@/components/UserManager/UserManager";

const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div>
        {/* <UserManager /> */}
        <CaretakerManager />
        <SuitesForm />
      </div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

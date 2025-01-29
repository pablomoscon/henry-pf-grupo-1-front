import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const DashUser = () => {
  return (
    <ProtectedRoute>
      <div className="mt-36 mb-36">Este es el Dashboard de Caretaker</div>
    </ProtectedRoute>
  );
};

export default DashUser;

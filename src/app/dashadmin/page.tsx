import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const DashAdmin = () => {
  return (
    <ProtectedRoute>
      <div className="mt-36 mb-36">Este es el Dashboard de Admin</div>
    </ProtectedRoute>
  );
};

export default DashAdmin;

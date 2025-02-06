import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import UserManager from "@/components/UserManager/UserManager";

const UsersPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <UserManager />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

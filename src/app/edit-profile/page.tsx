import EditProfile from "@/components/EditProfile/EditProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

const EditProfilePage = () => {
  return (
    <AuthGuard>
      <ProtectedRoute>
        <div>
          <EditProfile />
        </div>
      </ProtectedRoute>
    </AuthGuard>
  );
};

export default EditProfilePage;

import EditProfile from "@/components/EditProfile/EditProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const EditProfilePage = () => {
  return (
    <ProtectedRoute roles={["admin", "caretaker", "customer"]}>
      <div>
        <EditProfile />
      </div>
    </ProtectedRoute>
  );
};

export default EditProfilePage;

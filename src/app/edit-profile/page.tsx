import EditProfile from "@/components/EditProfile/EditProfile";
import ProtectedPage from "@/components/ProtectedPage/ProtectedPage";

const EditProfilePage = () => {
  return (
    <ProtectedPage requiredPage="/edit-profile">
      <div>
        <EditProfile />
      </div>
    </ProtectedPage>
  );
};

export default EditProfilePage;

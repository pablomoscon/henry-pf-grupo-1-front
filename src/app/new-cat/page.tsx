import EditProfile from "@/components/EditProfile/EditProfile";
import ProtectedPage from "@/components/ProtectedPage/ProtectedPage";

const NewCat = () => {
  return (
    <ProtectedPage requiredPage="/new-cat">
      <div>
        <EditProfile />
      </div>
    </ProtectedPage>
  );
};

export default NewCat;

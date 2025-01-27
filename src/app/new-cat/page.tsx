import NewCatForm from "../../components/NewCatForm/NewCatForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const NewCatPage = () => {
  return (
    <ProtectedRoute roles={["customer"]}>
      <div>
        <NewCatForm />
      </div>
    </ProtectedRoute>
  );
};

export default NewCatPage;

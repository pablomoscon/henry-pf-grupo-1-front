import NewCatForm from "@/components/NewCatForm/NewCatForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const NewCat = () => {
  return (
    <ProtectedRoute>
      <div>
        <NewCatForm />
      </div>
    </ProtectedRoute>
  );
};

export default NewCat;

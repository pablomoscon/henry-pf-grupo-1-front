import NewCatForm from "@/components/NewCatForm/NewCatForm";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const NewCat = () => {
  return (
    <AuthGuard>
      <ProtectedRoute>
        <div>
          <NewCatForm />
        </div>
      </ProtectedRoute>
    </AuthGuard>
  );
};

export default NewCat;

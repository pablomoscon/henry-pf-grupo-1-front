import NewCatForm from "@/components/NewCatForm/NewCatForm";
import NavigationGuard from "@/components/NavigationGuard/NavigationGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const NewCat = () => {
  return (
    <NavigationGuard originPath="/client-profile">
      <ProtectedRoute>
        <div>
          <NewCatForm />
        </div>
      </ProtectedRoute>
    </NavigationGuard>
  );
};

export default NewCat;

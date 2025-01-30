import NewCatForm from "@/components/NewCatForm/NewCatForm";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

const NewCat = () => {
  return (
    <AuthGuard>
      <div>
        <NewCatForm />
      </div>
    </AuthGuard>
  );
};

export default NewCat;

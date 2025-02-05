import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function ReviewPage() {
  return (
    <ProtectedRoute>
      <ReviewForm />
    </ProtectedRoute>
  );
}

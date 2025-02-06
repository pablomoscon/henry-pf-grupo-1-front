import ReservationForm from "@/components/ReservationForm/ReservationForm";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function ReservePage() {
  return (
    <AuthGuard>
      <ProtectedRoute>
        <div>
          <ReservationForm />
        </div>
      </ProtectedRoute>
    </AuthGuard>
  );
}

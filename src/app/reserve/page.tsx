import ReservationForm from "@/components/ReservationForm/ReservationForm";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ToastifyAlert from "@/components/ToastifyAlert/ToastifyAlert";

export default function ReservePage() {
  return (
    <AuthGuard>
      <ProtectedRoute>
        <ToastifyAlert />
        <div>
          <ReservationForm />
        </div>
      </ProtectedRoute>
    </AuthGuard>
  );
}

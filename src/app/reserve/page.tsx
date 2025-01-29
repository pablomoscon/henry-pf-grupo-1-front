import ReservationForm from "@/components/ReservationForm/ReservationForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function ReservePage() {
  return (
    <ProtectedRoute>
      <div>
        <ReservationForm />
      </div>
    </ProtectedRoute>
  );
}

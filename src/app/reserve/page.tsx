import ReservationForm from "@/components/ReservationForm/ReservationForm";
import NavigationGuard from "@/components/NavigationGuard/NavigationGuard";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function ReservePage() {
  return (
    <NavigationGuard originPath="/suites">
      <ProtectedRoute>
        <div>
          <ReservationForm />
        </div>
      </ProtectedRoute>
    </NavigationGuard>
  );
}

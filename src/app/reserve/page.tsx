import ReservationForm from "@/components/ReservationForm/ReservationForm";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export default function ReservePage() {
  return (
    <AuthGuard>
      <div>
        <ReservationForm />
      </div>
    </AuthGuard>
  );
}

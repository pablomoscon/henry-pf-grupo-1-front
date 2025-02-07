import PaymentStatus from "@/components/PaymentStatus/PaymentSatus";
import ToastifyAlert from "@/components/ToastifyAlert/ToastifyAlert";
import { Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastifyAlert />
        <PaymentStatus />
      </Suspense>
    </ProtectedRoute>
  );
}

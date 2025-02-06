"use client";

import { Suspense } from "react";
import PaymentCancel from "@/components/PaymentCancel/PaymentCancel";
import PaymentSuccess from "@/components/PaymentSuccess.tsx/PaymentSuccess";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const status = searchParams.get("status");

  return (
    <div className="text-3xl font-bold text-center py-10 h-screen flex items-center justify-center">
      <div>
        {status === "succeeded" ? (
          <PaymentSuccess sessionId={sessionId} status={status} />
        ) : status === "canceled" ? (
          <PaymentCancel sessionId={sessionId} status={status} />
        ) : (
          <p>No valid status specified.</p>
        )}
        <Link href="/" className="text-blue-500 block mt-4">
          Back to The Fancy Box
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}

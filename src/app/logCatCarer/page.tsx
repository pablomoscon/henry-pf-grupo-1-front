import { Suspense } from "react";
import LogCatCareComp from "@/components/LogCatCarerComp/LogCatCarerComp";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const LogCatClient = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <LogCatCareComp />
      </Suspense>
    </ProtectedRoute>
  );
};

export default LogCatClient;

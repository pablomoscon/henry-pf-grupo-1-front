import { Suspense } from "react";
import LogCatCareComp from "@/components/LogCatCarerComp/LogCatCarerComp";

const LogCatClient = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogCatCareComp />
    </Suspense>
  );
};

export default LogCatClient;

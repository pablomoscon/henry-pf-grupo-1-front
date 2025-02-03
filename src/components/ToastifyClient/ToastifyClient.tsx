"use client";

import dynamic from "next/dynamic";

const ToastifyAlert = dynamic(
  () => import("@/components/ToastifyAlert/ToastifyAlert"),
  { ssr: false }
);

export default function ToastifyClient() {
  return <ToastifyAlert />;
}

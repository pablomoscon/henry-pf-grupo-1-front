"use client";
import { useRouter } from "next/navigation";

const CaretakerChatLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black-dark pt-24">
      <div className="w-full max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.push("/dashcaretaker")}
          className="px-4 py-1.5 text-sm rounded-lg border border-gold-soft/20 text-gold-soft/70 hover:text-gold-soft hover:border-gold-soft/50 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
      {children}
    </div>
  );
};

export default CaretakerChatLayout;

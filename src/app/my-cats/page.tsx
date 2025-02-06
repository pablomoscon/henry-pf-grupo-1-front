import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import { MyCatsSection } from "@/components/MyCatsSection/MyCatsSection";

const MyCatsPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <MyCatsSection />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default MyCatsPage;

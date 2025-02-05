import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import { MyReservationsSection } from "@/components/MyReservationsSection/MyReservationsSection";

const MyReservationsPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <MyReservationsSection />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default MyReservationsPage;

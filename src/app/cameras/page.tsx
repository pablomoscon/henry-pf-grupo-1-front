import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import ClientLayout from '@/components/ClientLayout/ClientLayout';
import CameraSection from '@/components/CameraSection/CameraSection';

const CamerasPage = () => {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <CameraSection />
      </ClientLayout>
    </ProtectedRoute>
  );
};

export default CamerasPage;

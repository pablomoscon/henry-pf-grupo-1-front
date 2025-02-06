import PaymentStatus from '@/components/PaymentStatus/PaymentSatus';
import ToastifyAlert from '@/components/ToastifyAlert/ToastifyAlert';
import Link from 'next/link';
import { Suspense } from 'react';

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ToastifyAlert /> 
          <PaymentStatus />{' '}
    </Suspense>
  );
}

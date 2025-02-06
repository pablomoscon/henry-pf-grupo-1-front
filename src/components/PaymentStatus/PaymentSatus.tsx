'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') || '';
  const router = useRouter(); 

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Payment Succeeded');
    } else if (status === 'canceled') {
      alert('Payment Cancelled');
    } else {
      alert('Invalid Payment Status');
    }

    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, [status, router]);

  return (
    <div className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'>
      <div>
        <h1>
          {status === 'succeeded'
            ? 'Payment Successful'
            : status === 'canceled'
            ? 'Payment Cancelled'
            : 'Invalid Payment Status'}
        </h1>
      </div>
    </div>
  );
}

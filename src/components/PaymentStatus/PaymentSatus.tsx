'use client';
import { UserContext } from '@/contexts/userContext';
import { fetchPaymentStatus } from '@/services/paymentServices';
import { useSearchParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const { user } = useContext(UserContext);
  const status = searchParams?.get('status') || '';
  const sessionId = searchParams?.get('sessionId') || '';
  const token = user?.response?.token;
  const [message, setMessage] = useState<string>('Validating payment...');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!sessionId || !status || !token) {
        setMessage('Missing sessionId, status, or token.');
        setLoading(false);
        setTimeout(() => router.push('/'), 1500);
        return;
      }

      try {
        const result = await fetchPaymentStatus(sessionId, status, token);
        setMessage(result);
      } catch (error) {
        setMessage('Error processing payment status');
        console.error(error);
      } finally {
        setLoading(false);
        setTimeout(() => router.push('/'), 1000); 
      }
    };

    checkPaymentStatus();
  }, [sessionId, status, token, router]); 

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Payment Succeeded');
    } else if (status === 'canceled') {
      alert('Payment Cancelled');
    } else if (status) {
      alert('Invalid Payment Status');
    }
  }, [status]); 

  return (
    <div className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'>
      <div>
        {loading ? (
         <LoadingSpinner/>
        ) : (
          <h1>
            {status === 'succeeded'
              ? 'Payment Successful 🎉'
              : status === 'canceled'
              ? 'Payment Cancelled ❌'
              : 'Invalid Payment Status'}
          </h1>
        )}
        {!loading && <p>{message}</p>}
      </div>
    </div>
  );
}

'use client';
import { UserContext } from '@/contexts/userContext';
import { fetchPaymentStatus } from '@/services/paymentServices';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const { user } = useContext(UserContext);
  const status = searchParams?.get('status') || '';
  const sessionId = searchParams?.get('sessionId') || '';
  const token = user?.response?.token;
  const [message, setMessage] = useState<string>('Validating payment...');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!sessionId || !status || !token) {
        setMessage('Missing sessionId, status, or token.');
        setLoading(false);
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
      }
    };

    checkPaymentStatus();
  }, [sessionId, status, token]);

  return (
    <div className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'>
      <div>
        {loading ? (
          <h1>Loading...</h1>
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

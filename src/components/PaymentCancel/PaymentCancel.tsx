import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/userContext';

interface PaymentCancelProps {
  sessionId: string | null;
  status: string | null;
}

const PaymentCancel: React.FC<PaymentCancelProps> = ({ sessionId, status }) => {
  const { user, loading } = useContext(UserContext);
  const token = user?.response?.token;

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (loading) {
      return;
    }

    if (sessionId && status) {
      console.log('URL parameters -> sessionId:', sessionId, 'status:', status);

      if (!token) {
        console.error('Token not available.');
        alert('The token is not available.');
        return;
      }

      console.log('Making request with token:', token);
      fetch(
        `http://localhost:3000/payments/status?sessionId=${sessionId}&status=${status}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.text())
        .then((message) => {
          console.log('Message from backend:', message);
          setMessage(message);
          alert(message);
        })
        .catch((error) => {
          console.error('Error processing payment status:', error);
          alert('There was a problem processing the payment.');
        });
    } else {
      console.error('Missing parameters in the URL');
      alert('Missing necessary parameters in the URL.');
    }
  }, [sessionId, status, token, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Cancelled</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentCancel;

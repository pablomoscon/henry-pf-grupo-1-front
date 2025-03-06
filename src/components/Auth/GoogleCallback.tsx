'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '@/contexts/userContext';
import { fetchWithInterceptor } from '@/services/fetchInterceptor';
import { API_URL } from '../../../envs';

const GoogleCallback = () => {
  const router = useRouter();
  const { handleGoogleLogin } = useContext(UserContext);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        console.log('1. URL Search Params:', Object.fromEntries(params));
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
          console.error('2. Google auth error:', error);
          router.push('/login');
          return;
        }

        if (!token) {
          console.error('3. No token received in callback');
          router.push('/login');
          return;
        }

        console.log('4. Making API call to /auth/google/callback');
        const response = await fetchWithInterceptor(
          `${API_URL}/auth/google/callback`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          throw new Error('No response received from the server');
        }

        console.log('5. API Response status:', response.status);
        console.log(
          '5a. Response headers:',
          Object.fromEntries(response.headers)
        );

        if (!response.ok) {
          throw new Error('Failed to get user data');
        }

        const userData = await response.json();
        console.log('6. User data received:', {
          ...userData,
          token: 'REDACTED',
        });

        handleGoogleLogin({ token, user: userData });
        router.push('/dashboard');
      } catch (error) {
        console.error('7. Error in callback process:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [router, handleGoogleLogin]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center' style={{ color: 'var(--white-ivory)' }}>
        <p>Processing Google login...</p>
        <p className='text-sm mt-2'>
          Please wait while we complete your authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;

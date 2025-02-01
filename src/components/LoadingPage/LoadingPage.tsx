'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { UserContext } from '@/contexts/userContext';
import { useContext } from 'react';

const LoadingPage = () => {
  const { isLogged, handleGoogleLogin } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('auth='));

        if (!authCookie) return;

        const cookieValue = decodeURIComponent(authCookie.split('=')[1]);
        const { token, user } = JSON.parse(cookieValue);

        if (!token || !user) {
          console.error('Token or user data missing.');
          return;
        }
        handleGoogleLogin({
          token,
          user,
        });

        router.push('/profile');
      } catch (error) {
        console.error('Error during authentication process:', error);
      }
    };

    if (!isLogged()) {
      fetchUserData();
    } else {
      router.push('/profile');
    }
  }, [isLogged, handleGoogleLogin, router]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div
        role='status'
        aria-label='Loading'
        className='animate-spin rounded-full h-32 w-32 border-8 border-t-4 border-t-yellow-500 border-gray-200'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;

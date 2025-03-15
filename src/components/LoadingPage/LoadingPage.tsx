'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/userContext';
import { useContext } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getUserSession } from '@/services/authServices';


const LoadingPage = () => {
  const { isLogged, handleGoogleLogin } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserSession(); 
        if (!userData) {
          console.log('No active session, redirecting to login...');
          router.push('/login'); 
          return;
        }

        console.log('User session:', userData);

        const { token, user } = userData;

        if (!token || !user) {
          console.error('Token or user data missing.');
          return;
        }

        handleGoogleLogin({ token, user });
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
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;

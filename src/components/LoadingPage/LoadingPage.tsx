'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Si estás utilizando App Router
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

        const { token, user } = JSON.parse(
          decodeURIComponent(authCookie.split('=')[1])
        );

        if (!token || !user?.id) return;

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

  return <div className='container'></div>;
};

export default LoadingPage;

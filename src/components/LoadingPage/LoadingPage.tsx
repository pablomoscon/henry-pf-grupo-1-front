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

        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }

        const userProfile = await response.json();

        handleGoogleLogin({ token, user: userProfile });
        router.push('/dashboard');
      } catch (error) {
        console.error('Error durante el proceso de carga', error);
      }
    };

    if (!isLogged()) {
      fetchUserData();
    } else {
      router.push('/profile');
    }
  }, [isLogged, handleGoogleLogin, router]);

  return (
    <div className='container'>
    </div>
  );
};

export default LoadingPage;

'use client';
import { LoginResponse, UserData } from '@/interfaces/IUser';
import { useState, createContext, useEffect, useCallback, useRef } from 'react';
import { setLogoutHandler } from '@/services/fetchInterceptor';

interface UserContextProps {
  user: LoginResponse | null;
  setUser: (user: LoginResponse | null) => void;
  isLogged: () => boolean;
  logOut: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  handleGoogleLogin: (googleData: { token: string; user: UserData }) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLogged: () => false,
  logOut: () => {},
  updateUser: () => {},
  handleGoogleLogin: () => {},
  loading: true,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggingOut = useRef(false); // Usa useRef para evitar múltiples llamadas a logOut

  const isLogged = useCallback(() => {
    return user !== null && user.response.token !== undefined;
  }, [user]);

  const logOut = useCallback(async () => {
    if (isLoggingOut.current) return; // Previene doble logout
    isLoggingOut.current = true;

    alert('You have logged out.');
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.removeItem('user');
    setUser(null);
    setLoading(true);
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    setUser(localUser ? JSON.parse(localUser) : null);
    setLoading(false);

    setLogoutHandler(logOut);
  }, [logOut]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = useCallback(
    (userData: Partial<UserData>) => {
      if (user) {
        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                response: {
                  ...prevUser.response,
                  user: {
                    ...prevUser.response.user,
                    ...userData,
                  },
                },
              }
            : null
        );
      }
    },
    [user]
  );

  const handleGoogleLogin = useCallback(
    (googleData: { token: string; user: UserData }) => {
      console.log('1. Handling Google login in context:', {
        ...googleData,
        token: 'REDACTED',
      });

      const formattedResponse: LoginResponse = {
        success: 'success',
        response: {
          token: googleData.token,
          user: googleData.user,
        },
        user: googleData.user,
      };

      console.log('2. Setting formatted user data in context');
      setUser(formattedResponse);
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        logOut,
        updateUser,
        handleGoogleLogin,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

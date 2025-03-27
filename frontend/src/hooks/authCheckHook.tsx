import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/isAuthenticated';

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // Initial state is null

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsAuth(authStatus);
      } catch (error) {
        console.error('Authentication check failed', error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  return isAuth;
};

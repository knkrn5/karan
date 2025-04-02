import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/isAuthenticated';
import { useAuthStore } from '../stores/auth/authStore';

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

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
  }, [isSuccessLoginedIn]);

  return isAuth;
};

import { Link } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UserAccount from './userAccount.js';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useProfileStore } from '../../stores/profile/profileStore.js';
import { useAuthCheck } from '../../hooks/authCheckHook.js';
import { AuthButtonsSkeletonLoading } from '../../components/ui/skeletonLoadings.js';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AuthButtons() {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const firstName = useProfileStore(state => state.firstName);

  const { setFirstName, setLastName, setMail, setIsFetchingProfileData } = useProfileStore();

  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);
  const setIsSuccessLoginedIn = useAuthStore(state => state.setIsSuccessLoginedIn);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  const AuthButtonsRef = useRef<HTMLButtonElement>(null);
  const userAccountRef = useRef<HTMLDivElement>(null);

  const authStatus = useAuthCheck();

  const updateLoginStatus = useCallback(() => {
    if (authStatus === null) {
      return;
    }
    setIsSuccessLoginedIn(authStatus);
  }, [authStatus, setIsSuccessLoginedIn]);

  useEffect(() => {
    updateLoginStatus();

    function outsideClick(event: MouseEvent) {
      if (
        showProfile &&
        event.target &&
        !userAccountRef.current?.contains(event.target as Node) &&
        !AuthButtonsRef.current?.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', outsideClick);
  }, [authStatus, showProfile, updateLoginStatus]);

  useEffect(() => {
    if (!isSuccessLoginedIn) return;

    (async () => {
      setIsFetchingProfileData(true);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/profile/details`, {
          withCredentials: true,
        });

        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setMail(data.data.email);
      } catch (error) {
        console.log('user detail fetching error', error);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data ?? error.response?.data?.message);
        }
      } finally {
        setIsFetchingProfileData(false);
      }
    })();
  }, [
    setFirstName,
    setLastName,
    setMail,
    setIsSuccessLoginedIn,
    isSuccessLoginedIn,
    setIsFetchingProfileData,
  ]);

  if (isSuccessLoginedIn === null) {
    return <AuthButtonsSkeletonLoading />;
  }

  return (
    <>
      {!isSuccessLoginedIn ? (
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 ">
          <Link
            to="/login"
            className="text-gray-800 dark:text-white border-2 border-gray-400 dark:border-gray-500 duration-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full cursor-pointer duration-300 hover:ring-2 hover:ring-blue-600 dark:hover:ring-gray-300"
          title="Account"
          onClick={() => setShowProfile(!showProfile)}
          ref={AuthButtonsRef}
        >
          <span className="text-white text-lg font-semibold">{letter}</span>
        </button>
      )}
      {showProfile && isSuccessLoginedIn && (
        <div ref={userAccountRef}>
          {' '}
          <UserAccount />{' '}
        </div>
      )}
    </>
  );
}

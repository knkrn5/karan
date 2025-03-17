import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosApi from '../../utils/axios.js';
import UserAccount from './userAccount.js';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useProfileStore } from '../../stores/auth/profileStore.js';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AuthButtons() {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const firstName = useProfileStore(state => state.firstName);
  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  const isSuccessLoginedInLs = localStorage.getItem('isSuccessLoginedInLs') === 'true';

  useEffect(() => {
    const isSuccessLoginedInLs = localStorage.getItem('isSuccessLoginedInLs') === 'true';
    if (!isSuccessLoginedInLs) {
      axios
        .post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true })
        .catch(err => console.error('Logout error:', err));
      localStorage.removeItem('isSuccessLoginedInLs');
      return;
    }

    (async () => {
      try {
        const { data } = await axiosApi.get(`${BACKEND_URL}/api/v1/profile/details`, {
          withCredentials: true,
        });

        if (data.success) {
          useProfileStore.getState().setFirstName(data.data.firstName);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isSuccessLoginedIn]);

  return (
    <>
      {!isSuccessLoginedInLs ? (
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
        <div
          className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full cursor-pointer duration-300 hover:ring-2 hover:ring-blue-600 dark:hover:ring-gray-300"
          title="Account"
          onClick={() => setShowProfile(!showProfile)}
        >
          <span className="text-white text-lg font-semibold">{letter}</span>
        </div>
      )}

      {showProfile && isSuccessLoginedInLs ? <UserAccount /> : null}
    </>
  );
}

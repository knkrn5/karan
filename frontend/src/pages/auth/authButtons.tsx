import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/authUserProfileStore';
import UserProfile from './userProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthButtons() {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const firstName = useProfileStore((state) => state.firstName);
  const isSuccessLoginedIn = useProfileStore((state) => state.isSuccessLoginedIn);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(`${API_URL}/api/v1/auth/user/profile`, {
          withCredentials: true,
        });

        const { data } = response;
        console.log(data);

        if (data.success) {
          useProfileStore.getState().setFirstName(data.userdata.firstName);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    if (localStorage.getItem('isSuccessLoginedInLs') === 'true') {
      getProfile();
      setIsSignedIn(true);
    } else {
      axios.post(`${API_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
      setIsSignedIn(false);
    }
  }, [isSuccessLoginedIn]);

  return (
    <>
      {!isSignedIn ? (
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 ">
          <Link to="/login" className="text-gray-800 dark:text-white border-2 border-gray-400 dark:border-gray-500 duration-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
            Login
          </Link>
          <Link to="/register" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Sign up
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full cursor-pointer duration-300 hover:ring-2 hover:ring-blue-600 dark:hover:ring-gray-300" title="profile button" onClick={() => setShowProfile(!showProfile)}>
          <span className="text-white text-lg font-semibold">{letter}</span>
        </div>
      )}

      {showProfile && isSignedIn ? <UserProfile /> : null}
    </>
  );
}

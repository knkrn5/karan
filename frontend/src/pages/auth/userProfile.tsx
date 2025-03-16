import { Link, useNavigate } from 'react-router';
import { AnimatedLetterSvg, UserAccoutbgSvg } from '../../icons/userProfileSvg';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/auth/profileStore';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth/authStore';
// import StatusNotifications from '../../utils/StatusNotifications';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(false);

  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  const navigate = useNavigate();

  // const statusInfo = useAuthStore(state => state.statusInfoAuth);
  const { setStatusInfoAuth } = useAuthStore();

  // Trigger animation on component mount
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('isSuccessLoginedInLs')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/profile/delete-account`, {
        withCredentials: true,
      });
      const { data } = response;
      console.log(response);
      if (data.success) {
        setStatusInfoAuth({ success: data.message });

        await axios
          .post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true })
          .then(response => {
            if (response.status === 200) {
              useAuthStore.getState().setIsSuccessLoginedIn(false);
              useProfileStore.getState().resetProfileStore();
              localStorage.removeItem('isSuccessLoginedInLs');
              navigate('/login');
            }
          });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusInfoAuth({ error: error.response?.data.message || error.message });
      }
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-72px)] p-2 flex items-center justify-center transition-all duration-500 
      bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      {/* Card */}
      <div
        className={`mx-auto rounded-lg overflow-hidden w-80 duration-300
        bg-white dark:bg-gray-900 shadow-lg hover:dark:shadow-gray-700  ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Background SVG */}
        <div className="bg-gray-200 dark:bg-gray-700 ">
          <UserAccoutbgSvg />
        </div>

        {/* Profile Letter SVG */}
        <div className="flex justify-center -mt-12">
          <AnimatedLetterSvg letter={letter} />
        </div>

        {/* User Info */}
        <div className="text-center mt-2">
          <h2 className="text-xl font-extrabold ">
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 ">{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5 md:flex-row justify-center md:gap-4 my-5">
          {/* Reset Password */}
          <button>
            <Link
              to=""
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 
              dark:bg-blue-500 dark:hover:bg-blue-600 "
            >
              Reset Password
            </Link>
          </button>

          {/* Delete Account */}
          <button onClick={handleDeleteAccount}>
            <Link
              to=""
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 
              dark:bg-red-500 dark:hover:bg-red-600 "
            >
              Delete Account
            </Link>
          </button>
        </div>
        {/* <StatusNotifications statusInfo={statusInfo} /> */}
      </div>
    </div>
  );
}

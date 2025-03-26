import { useNavigate } from 'react-router';
import { AnimatedLetterSvg, UserAccoutbgSvg } from '../../icons/userProfileSvg';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/auth/profileStore';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth/authStore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { isAuthenticated } from '../../utils/isAuthenticated';
// import StatusNotifications from '../../utils/StatusNotifications';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);
  const [confirmPassword, setConfirmPassword] = useState<{
    resetPassword: boolean;
    deleteAccount: boolean;
  }>({
    resetPassword: false,
    deleteAccount: false,
  });

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  // const statusInfoAuth = useAuthStore(state => state.statusInfoAuth);

  const navigate = useNavigate();

  const { setStatusInfoAuth } = useAuthStore();

  // animation trigger
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  useEffect(() => {
    isAuthenticated()
      .then(authRes => {
        if (!authRes) {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error(error);
        navigate('/login');
      });
  }, [navigate]);

  const handleDeleteAccount = async () => {
    setConfirmPassword(prevState => ({
      ...prevState,
      deleteAccount: true,
    }));
    const deleteConfirm = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!deleteConfirm) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/profile/delete-account`, {
        withCredentials: true,
      });
      const { data } = response;
      if (data.success) {
        setStatusInfoAuth({ success: data.message });

        await axios
          .post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true })
          .then(response => {
            if (response.status === 200) {
              useAuthStore.getState().setIsSuccessLoginedIn(false);
              useProfileStore.getState().resetProfileStore();
              localStorage.removeItem('isSuccessLoginedInLs');
              navigate('/register');
            }
          });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusInfoAuth({ error: error.response?.data.message || error.message });
      }
      console.log(error);
    } finally {
      setTimeout(() => {
        setStatusInfoAuth({});
      }, 10 * 1000);
      setIsDeleting(false);
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
        bg-white dark:bg-gray-900 shadow-lg hover:dark:shadow-gray-900  ${
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

        <div className="flex justify-center">
          <input
            className={`w-[90%] max-w-md m-[10px_8px_0_8px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
              confirmPassword.deleteAccount ? 'block' : 'hidden'
            }`}
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        {/* Buttons */}
        <div className="flex md:flex-row justify- px-2 my-5">
          {/* Reset Password */}
          <button
            className="text-white  bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm w-fit px-4 py-2 mx-auto md:px-5 md:py-2.5 
              dark:bg-blue-500 dark:hover:bg-blue-600 "
          >
            Reset Password
          </button>

          {/* Delete Account */}
          <button
            onClick={handleDeleteAccount}
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-fit px-4 py-2 mx-auto md:px-5 md:py-2.5 
            dark:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center">
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" /> Deleting...
              </span>
            ) : (
              'Delete Account'
            )}
          </button>
        </div>
        {/* <StatusNotifications statusInfo={statusInfoAuth} /> */}
      </div>
    </div>
  );
}

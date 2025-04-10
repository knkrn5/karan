import { useNavigate } from 'react-router';
import { AnimatedLetterSvg, UserAccoutbgSvg } from '../../icons/userProfileSvg';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/auth/profileStore';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth/authStore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import BrandLoadingPage from '../brandLoadingPage';
import { TwoSmallLinesSkeletonLoading } from '../../components/skeletonLoadings';
// import StatusNotifications from '../../utils/StatusNotifications';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordBool, setConfirmPasswordBool] = useState<{
    resetPassword: boolean;
    deleteAccount: boolean;
  }>({
    resetPassword: false,
    deleteAccount: false,
  });

  const isFetchingProfileData = useProfileStore(state => state.isFetchingProfileData);

  const [passwordInputErrror, setPasswordInputErrror] = useState<string>('');

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  const navigate = useNavigate();

  // const statusInfoAuth = useAuthStore(state => state.statusInfoAuth);
  const { setStatusInfoAuth } = useAuthStore();

  // animation trigger
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  // error handling for password validation
  const validatePassword = async () => {
    try {
      setIsDeleting(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/auth/verify-password`,
        { password: confirmPassword },
        { withCredentials: true }
      );
      setPasswordInputErrror('');
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data.message || 'Invalid password'
        : 'An unexpected error occurred';
      setPasswordInputErrror(errorMessage);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (confirmPasswordBool.deleteAccount) {
      setConfirmPasswordBool(prevState => ({
        ...prevState,
        deleteAccount: false,
      }));
      setPasswordInputErrror('');
      return;
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmPasswordBool.deleteAccount) {
      setConfirmPasswordBool(prev => ({ ...prev, deleteAccount: true }));
      return;
    }

    if (!confirmPassword) {
      return setPasswordInputErrror('Password is required');
    }

    if (!(await validatePassword())) return;

    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setConfirmPasswordBool(prevState => ({
        ...prevState,
        deleteAccount: false,
      }));
      return;
    }

    try {
      setIsDeleting(true);
      const response = await axios.delete(`${BACKEND_URL}/api/v1/profile/delete-account`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setStatusInfoAuth({ success: response.data.message });

        await axios.post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true });

        useAuthStore.getState().setIsSuccessLoginedIn(false);
        useProfileStore.getState().resetProfileStore();
        localStorage.removeItem('isSuccessLoginedInLs');
        navigate('/register');
      }
    } catch (error) {
      setStatusInfoAuth({
        error: axios.isAxiosError(error) ? error.response?.data.message : 'An error occurred',
      });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setStatusInfoAuth({}), 10000);
    }
  };

  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  useEffect(() => {
    if (isSuccessLoginedIn === false) {
      navigate('/login', { replace: true });
    }
  }, [isSuccessLoginedIn, navigate]);

  if (isSuccessLoginedIn === null) {
    return <BrandLoadingPage />;
  }

  return (
    <div
      className="min-h-[calc(100vh-72px)] p-2 flex items-center justify-center  
      bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      {/* Card */}
      <div
        className={`mx-auto rounded-lg overflow-hidden max-w-[480px] w-80 
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
        {isFetchingProfileData ? (
          <div className="w-fit mx-auto m-2">
            <TwoSmallLinesSkeletonLoading />
          </div>
        ) : (
          <div className="text-center mt-2">
            <h2 className="text-xl font-extrabold ">
              {firstName.toUpperCase()} {lastName.toUpperCase()}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 ">{email}</p>
          </div>
        )}

        {/*  Password confirm */}
        <div
          className={`flex flex-col m-4 ${confirmPasswordBool.deleteAccount ? 'block' : 'hidden'}`}
        >
          <label htmlFor="confirmPassword" className="mt-3 block text-gray-700 dark:text-gray-300">
            <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
              Enter Password
            </span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handlePasswordInput}
            className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          />
          {passwordInputErrror && (
            <p className="text-red-600 text-sm mt-1">{passwordInputErrror}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col  sm:flex-row gap-2 sm:gap-0 px-2 my-5">
          {/* Reset Password */}
          <button
            type="button"
            className="w-fit text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm  px-4 py-2 mx-auto md:px-5 md:py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
            onClick={handleResetPassword}
          >
            {confirmPasswordBool.deleteAccount ? 'Cancel Delete' : 'Reset Password'}
          </button>

          {/* Delete Account */}
          <button
            type="button"
            aria-label="Delete Account"
            onClick={handleDeleteAccount}
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-fit px-4 py-2 mx-auto md:px-5 md:py-2.5 dark:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center">
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" /> Deleting...
              </span>
            ) : (
              `${confirmPasswordBool.deleteAccount ? 'Confirm Delete' : 'Delete Account'}`
            )}
          </button>
        </div>
        {/* <StatusNotifications statusInfo={statusInfoAuth} /> */}
      </div>
    </div>
  );
}

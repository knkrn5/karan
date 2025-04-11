import { useNavigate } from 'react-router';
import { AnimatedLetterSvg, UserAccoutbgSvg } from '../../icons/userProfileSvg';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/auth/profileStore';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth/authStore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import BrandLoadingPage from '../brandLoadingPage';
import { TwoSmallLinesSkeletonLoading } from '../../components/skeletonLoadings';
import { verifyPassword, sendOtp, verifyOtp } from '../../utils/auth.utils';
import StatusNotifications from '../../utils/StatusNotifications';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(false);

  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const [inputValue, setInputValue] = useState<string>('');
  const [confirmationsBool, setConfirmationsBool] = useState<{
    resetPassword: boolean;
    deleteAccount: boolean;
    isOtpSent: boolean;
    isOtpVerified: boolean;
  }>({
    resetPassword: false,
    deleteAccount: false,
    isOtpSent: false,
    isOtpVerified: false,
  });

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const isFetchingProfileData = useProfileStore(state => state.isFetchingProfileData);

  const [InputErrror, setInputErrror] = useState<string>('');

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  const navigate = useNavigate();

  const statusInfoAuth = useAuthStore(state => state.statusInfoAuth);
  const { setStatusInfoAuth } = useAuthStore();

  // animation trigger
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);


    //clearing statusnotifications
    setTimeout(() => setStatusInfoAuth({}), 5000);
  }, [setStatusInfoAuth]);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleResetPassword = async () => {
    if (confirmationsBool.deleteAccount) {
      setInputValue('');
      setConfirmationsBool(prevState => ({
        ...prevState,
        deleteAccount: false,
        isOtpSent: false,
        isOtpVerified: false,
      }));
      setInputErrror('');
      setStatusInfoAuth({});
      setIsDeleting(false);
      return;
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmationsBool.deleteAccount) {
      setConfirmationsBool(prev => ({ ...prev, deleteAccount: true }));
      return;
    }

    setIsDeleting(true);

    if (!inputValue) {
      setIsDeleting(false);
      setInputErrror('Password is required');
      return;
    }

    if (confirmationsBool.deleteAccount && !confirmationsBool.isOtpSent) {
      const response = await verifyPassword(inputValue);
      if (response.success) {
        setInputErrror('');
        // return response.success;
      } else {
        setInputErrror(response.message);
        setIsDeleting(false);
        return response.success;
      }
      setInputValue('');
    }

    if (confirmationsBool.deleteAccount && !confirmationsBool.isOtpSent) {
      const response = await sendOtp(email, 'Account Deletion');
      if (response.success) {
        setConfirmationsBool(prevState => ({
          ...prevState,
          isOtpSent: true,
        }));
        setStatusInfoAuth({ success: response.message });
      }
      setIsDeleting(false);
      return;
    }

    if (confirmationsBool.isOtpSent && !confirmationsBool.isOtpVerified) {
      const response = await verifyOtp(email, inputValue);
      if (response.success) {
        setConfirmationsBool(prevState => ({
          ...prevState,
          isOtpVerified: true,
        }));
        setStatusInfoAuth({ success: response.message });
      } else {
        setStatusInfoAuth({ error: response.message });
        setIsDeleting(false);
        return response.success;
      }
      setIsDeleting(false);
      console.log('verifing otp');
    }

    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      handleResetPassword();
      return;
    }

    try {
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
        bg-white dark:bg-gray-900 shadow-lg hover:dark:shadow-gray-900  duration-300 transition-shadow ${
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

        {/*  Password confirm  and OTP*/}
        <div
          className={`flex flex-col m-4 ${confirmationsBool.deleteAccount ? 'block' : 'hidden'}`}
        >
          <label htmlFor="confirmPassword" className="mt-3 block text-gray-700 dark:text-gray-300">
            <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
              {confirmationsBool.isOtpSent ? 'Enter OTP' : 'Enter Password'}
            </span>
          </label>
          <input
            type={confirmationsBool.isOtpSent ? 'number' : 'password'}
            name={confirmationsBool.isOtpSent ? 'otp' : 'confirmPassword'}
            id={confirmationsBool.isOtpSent ? 'otp' : 'confirmPassword'}
            placeholder={confirmationsBool.isOtpSent ? 'OTP' : 'Confirm Password'}
            value={inputValue}
            onChange={handlePasswordInput}
            className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          />
          {InputErrror && <p className="text-red-600 text-sm mt-1">{InputErrror}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 px-2 my-5">
          {/* Reset Password */}
          <button
            type="button"
            className="relative group w-fit text-white bg-blue-600  font-medium rounded-lg text-sm  px-4 py-2 mx-auto md:px-5 md:py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
            onClick={handleResetPassword}
          >
            <span className="relative z-10">
              {confirmationsBool.deleteAccount ? 'Cancel Delete' : 'Reset Password'}
            </span>
            <span className="absolute z-0 left-0 top-0 h-full w-0 bg-blue-700 rounded-lg transition-all duration-500 ease-in-out group-hover:w-full "></span>
          </button>

          {/* Delete Account */}
          <button
            type="button"
            aria-label="Delete Account"
            onClick={handleDeleteAccount}
            className="relative group text-white bg-red-600 font-medium rounded-lg text-sm w-fit px-4 py-2 mx-auto md:px-5 md:py-2.5 dark:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center cursor-pointer"
            disabled={isDeleting}
          >
            <span className="relative z-10">
              {isDeleting ? (
                <span className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                  {confirmationsBool.deleteAccount &&
                  !confirmationsBool.isOtpSent &&
                  !confirmationsBool.isOtpVerified
                    ? 'Confirming...'
                    : confirmationsBool.deleteAccount &&
                      confirmationsBool.isOtpSent &&
                      !confirmationsBool.isOtpVerified
                    ? 'verifying...'
                    : 'Deleting...'}
                </span>
              ) : (
                `${
                  confirmationsBool.deleteAccount && !confirmationsBool.isOtpSent
                    ? 'Confirm Delete'
                    : confirmationsBool.deleteAccount && confirmationsBool.isOtpSent
                    ? 'Confirm OTP'
                    : 'Delete Account'
                }`
              )}
            </span>
            <span className="absolute z-0 left-0 top-0 h-full w-0 bg-red-700 rounded-lg transition-all duration-500 ease-in-out group-hover:w-full "></span>
          </button>
        </div>
        <div className="-mt-5">
          <StatusNotifications statusInfo={statusInfoAuth} />
        </div>
      </div>
    </div>
  );
}

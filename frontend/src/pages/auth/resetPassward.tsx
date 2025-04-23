import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { ICnotificationMsg } from '../../components/notifications/ICnotificationMsg.js';
import { FaRegEye, FaRegEyeSlash, FaRegSave } from 'react-icons/fa';
import { FaRepeat } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useTRpopupNotificationStore } from '../../stores/popup/TRpopupNotificationStore.js';
import { useICnotificationMsgStore } from '../../components/stores/ICnotificationMsgStore.js';
import { sendUserAgentDataEmail } from '../../utils/userAgentData.js';
import { verifyExistingUser, sendEmailOtp, verifyEmailOtp } from '../../utils/auth.utils.js';
import { CiEdit } from 'react-icons/ci';
import {
  validateEmailInputField,
  validatePasswordInputField,
} from '../../utils/inputFieldValidations.js';
import PasswardRequirementToolTip from '../../components/ui/passwardRequirementToolTip.js';
import { remainingTimeCalculator } from '../../utils/remainingTimeCalculator.js';

interface ResetPasswardFieldDataProps {
  email: string;
  otp?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ResetPassward() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [resetPasswardFieldData, setResetPasswardFieldData] = useState<ResetPasswardFieldDataProps>(
    {
      email: '',
      otp: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  );

  const [showPassword, setShowPassword] = useState<{
    newPassword: boolean;
    confirmNewPassword: boolean;
  }>({
    newPassword: false,
    confirmNewPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [resetPasswardFieldErrors, setResetPasswardFieldErrors] =
    useState<ResetPasswardFieldDataProps>({
      email: '',
      newPassword: '',
      confirmNewPassword: '',
    });

  const [otpConfirmations, setOtpConfirmations] = useState<{
    isOptSent: boolean;
    isOptVerified: boolean;
    isResendingOtp: boolean;
  }>({
    isOptSent: false,
    isOptVerified: false,
    isResendingOtp: false,
  });

  //auth store data
  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  // TRnotification popup store data
  const { setTRpopupNotificationMsg } = useTRpopupNotificationStore();

  //ICnotification popup store data
  const { setICnotificationMsg } = useICnotificationMsgStore();

  const navigate = useNavigate();

  // Timer calculator
  // const timerCounter = remainingTimeCalculator(20);
  // const interval = setInterval(() => {
  //   const res = timerCounter();
  //   console.log(`Time left: ${res.formattedRemainingTime}`);
  //   if (res.remainingSeconds < 0) {
  //     console.log('Time is up!');
  //     clearInterval(interval);
  //   }
  // }, 1000);

  // Trigger animation
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const validateloginForm = () => {
    const resetPasswardFieldErrors: ResetPasswardFieldDataProps = {
      email: '',
      newPassword: '',
    };

    // Email validation
    const emailInputFieldError = validateEmailInputField(resetPasswardFieldData.email);
    if (emailInputFieldError) {
      resetPasswardFieldErrors.email = emailInputFieldError;
    }

    //otp field validation
    if (otpConfirmations.isOptSent) {
      if ((resetPasswardFieldData.otp ?? '').trim().length === 0) {
        resetPasswardFieldErrors.newPassword = 'Please enter the OTP';
      }
    }

    //new password field validation
    if (otpConfirmations.isOptVerified) {
      const passwordInputFieldError = validatePasswordInputField(
        resetPasswardFieldData.newPassword ?? ''
      );
      if (passwordInputFieldError) {
        resetPasswardFieldErrors.newPassword = passwordInputFieldError;
      }
    }

    //confirm new password field validation
    if (otpConfirmations.isOptVerified) {
      if ((resetPasswardFieldData.confirmNewPassword ?? '').trim().length === 0) {
        resetPasswardFieldErrors.confirmNewPassword = 'Please Enter the Confirm Password';
      } else if (resetPasswardFieldData.newPassword !== resetPasswardFieldData.confirmNewPassword) {
        resetPasswardFieldErrors.confirmNewPassword = 'Password did not match';
      }
    }

    return resetPasswardFieldErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswardFieldData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setICnotificationMsg({});
  };

  async function handleSendEmailOtp(email: string, subject: string, excerpt: string) {
    const response = await sendEmailOtp(email, subject, excerpt);
    if (response.success) {
      setOtpConfirmations(prevState => ({ ...prevState, isOptSent: true }));
      setICnotificationMsg({ success: response.message });
      return true;
    } else {
      setICnotificationMsg({ error: response.message });
      return false;
    }
  }

  async function handleVerifyEmailOtp(email: string, otp: string) {
    const response = await verifyEmailOtp(email, otp);
    if (response.success) {
      setOtpConfirmations(prevState => ({ ...prevState, isOptVerified: true }));
      setICnotificationMsg({ success: response.message });
      return true;
    } else {
      setICnotificationMsg({ error: response.message });
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginFieldValidation = validateloginForm();
    setResetPasswardFieldErrors(loginFieldValidation);

    if (Object.values(loginFieldValidation).some(error => error !== '')) {
      return;
    }

    setICnotificationMsg({});
    setIsLoading(true);

    //verifying existing user
    if (!otpConfirmations.isOptSent) {
      const response = await verifyExistingUser(resetPasswardFieldData.email);
      if (!response.success) {
        setICnotificationMsg({ error: response.message });
        setIsLoading(false);
        return;
      }
    }

    //sending otp
    if (!otpConfirmations.isOptSent) {
      const sendEmailOtpRes = await handleSendEmailOtp(
        resetPasswardFieldData.email,
        'reset password',
        'We received a request to reset your password. Please enter the OTP below to proceed:'
      );
      setIsLoading(false);
      return sendEmailOtpRes;
    }

    //verifying otp
    if (otpConfirmations.isOptSent && !otpConfirmations.isOptVerified) {
      const verifyEmailOtpRes = await handleVerifyEmailOtp(
        resetPasswardFieldData.email,
        resetPasswardFieldData.otp ?? ''
      );
      setIsLoading(false);
      return verifyEmailOtpRes;
    }

    if (otpConfirmations.isOptSent && otpConfirmations.isOptVerified) {
      try {
        const response = await axios.patch(`${BACKEND_URL}/api/v1/auth/reset-password`, {
          email: resetPasswardFieldData.email,
          newPassword: resetPasswardFieldData.newPassword,
        });
        setICnotificationMsg({ success: response.data.message });
        setTRpopupNotificationMsg({ success: response.data.message });
        navigate('/login');

        //emailing user agent data
        await sendUserAgentDataEmail(
          resetPasswardFieldData.email,
          'Alert! your KARAN Account Password has been Reset',
          'We received a request to reset your password. These are the details from where this request was made.'
        );
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          setICnotificationMsg({ error: error.response?.data.message ?? error.message });
        } else {
          setICnotificationMsg({ error: 'An unexpected error occurred' });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isSuccessLoginedIn === true) {
      navigate('/profile', { replace: true });
    }
  }, [isSuccessLoginedIn, navigate]);

  if (isSuccessLoginedIn === null) {
    return (
      <div className="flex justify-center items-center">
        <img src="/favicons/K.svg" alt="logo" className=" animate-pulse duration-700" />
        <AiOutlineLoading3Quarters className="absolute animate-spin duration-1000 size-32 text-gray-400 dark:text-gray-700" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 w-full max-w-md transition-transform duration-500 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
        Reset Password
      </h2>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        <span className="px-2 text-sm text-gray-500 dark:text-gray-400">Reset Password</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
      </div>

      {/* Email */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
              Email
            </span>
            <button
              type="button"
              title="edit Email address"
              disabled={!otpConfirmations.isOptSent}
              onClick={() => {
                setOtpConfirmations(prev => ({
                  ...prev,
                  isOptSent: false,
                  isOptVerified: false,
                }));
                setICnotificationMsg({});
              }}
              className="focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="edit Email address"
            >
              {otpConfirmations.isOptSent ? <CiEdit /> : <FaRegSave />}
            </button>
          </label>
          <input
            name="email"
            value={resetPasswardFieldData.email}
            onChange={e => handleInputChange(e)}
            placeholder="email"
            disabled={isLoading || otpConfirmations.isOptSent}
            className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${
              resetPasswardFieldErrors.email
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {resetPasswardFieldErrors.email && (
            <p className="text-red-600 text-sm mt-1">{resetPasswardFieldErrors.email}</p>
          )}
        </div>

        {/* otp and newPassword */}
        <div>
          <label
            htmlFor={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
            className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
              {!otpConfirmations.isOptVerified ? (
                'Enter OTP'
              ) : (
                <>
                  New Password <PasswardRequirementToolTip />
                </>
              )}
            </span>
            <button
              type="button"
              title={
                !otpConfirmations.isOptVerified
                  ? 'resend OTP'
                  : showPassword.newPassword
                  ? 'Hide password'
                  : 'Show password'
              }
              onClick={async () => {
                if (!otpConfirmations.isOptVerified) {
                  setOtpConfirmations(prev => ({ ...prev, isResendingOtp: true }));
                  const resendOtpEmailRes = await handleSendEmailOtp(
                    resetPasswardFieldData.email,
                    'Reset Password',
                    'We have again received a request to reset your password. Please enter the OTP below to proceed: '
                  );
                  if (resendOtpEmailRes) {
                    setICnotificationMsg({ info: 'OTP resent successfully' });
                  }
                  setOtpConfirmations(prev => ({ ...prev, isResendingOtp: false }));
                } else {
                  setShowPassword(prev => ({ ...prev, newPassword: !showPassword.newPassword }));
                }
              }}
              className="focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !otpConfirmations.isOptSent || otpConfirmations.isResendingOtp}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {!otpConfirmations.isOptVerified && !otpConfirmations.isResendingOtp ? (
                <FaRepeat />
              ) : !otpConfirmations.isOptVerified && otpConfirmations.isResendingOtp ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : !showPassword.newPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </label>

          <input
            name={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
            id={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
            type={
              !otpConfirmations.isOptVerified
                ? 'number'
                : showPassword.newPassword
                ? 'text'
                : 'password'
            }
            value={
              !otpConfirmations.isOptVerified
                ? resetPasswardFieldData.otp
                : resetPasswardFieldData.newPassword
            }
            onChange={e => handleInputChange(e)}
            placeholder={!otpConfirmations.isOptVerified ? 'OTP' : 'New Password'}
            disabled={isLoading || !otpConfirmations.isOptSent}
            className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  resetPasswardFieldErrors.newPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
          />
          {resetPasswardFieldErrors.newPassword && (
            <p className="text-red-600 text-sm mt-1">{resetPasswardFieldErrors.newPassword}</p>
          )}
        </div>

        {/* confirm new pasword */}
        {otpConfirmations.isOptVerified && (
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                Confirm New Password
              </span>
              <button
                type="button"
                title={showPassword.confirmNewPassword ? 'Hide password' : 'Show password'}
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    confirmNewPassword: !showPassword.confirmNewPassword,
                  }))
                }
                className="focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {!showPassword.confirmNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </label>

            <input
              name="confirmNewPassword"
              title="Confirm New Password"
              id="confirmNewPassword"
              type={showPassword.confirmNewPassword ? 'text' : 'password'}
              value={resetPasswardFieldData.confirmNewPassword}
              onChange={e => handleInputChange(e)}
              placeholder="Confirm New Password"
              disabled={isLoading || !otpConfirmations.isOptSent}
              className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  resetPasswardFieldErrors.newPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
            />
            {resetPasswardFieldErrors.confirmNewPassword && (
              <p className="text-red-600 text-sm mt-1">
                {resetPasswardFieldErrors.confirmNewPassword}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition duration-200 flex items-center justify-center ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
              {!otpConfirmations.isOptSent && !otpConfirmations.isOptVerified
                ? 'Sending OTP...'
                : (() => {
                    let buttonText = '';
                    if (otpConfirmations.isOptSent && !otpConfirmations.isOptVerified) {
                      buttonText = 'Verifying OTP...';
                    } else {
                      buttonText = 'Resetting Password...';
                    }
                    return buttonText;
                  })()}
            </span>
          ) : !otpConfirmations.isOptSent && !otpConfirmations.isOptVerified ? (
            'Send OTP'
          ) : otpConfirmations.isOptSent && !otpConfirmations.isOptVerified ? (
            'Verify OTP'
          ) : (
            'Reset Password'
          )}
        </button>
      </form>

      <div className="flex flex-col items-center mt-4">
        <p className=" text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
        <button
          type="button"
          className="mt-2 text font-bold  text-gray-600 dark:text-gray-400 hover:underline duration-300 transition-transform cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
      <ICnotificationMsg />
    </div>
  );
}

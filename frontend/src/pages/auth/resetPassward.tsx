import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { ICnotificationMsg } from '../../components/notifications/ICnotificationMsg.js';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useTRpopupNotificationStore } from '../../stores/popup/TRpopupNotificationStore.js';
import { useICnotificationMsgStore } from '../../components/stores/ICnotificationMsgStore.js';
import { sendUserAgentDataEmail } from '../../utils/userAgentData.js';
import { sendEmailOtp, verifyEmailOtp } from '../../utils/auth.utils.js';

interface loginFeildDataProps {
  email: string;
  otp?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ResetPassward() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [loginFormFieldData, setLoginFormFieldData] = useState<loginFeildDataProps>({
    email: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginFieldErrors, setLoginFieldErrors] = useState<loginFeildDataProps>({
    email: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [otpConfirmations, setOtpConfirmations] = useState<{
    isOptSent: boolean;
    isOptVerified: boolean;
  }>({
    isOptSent: false,
    isOptVerified: false,
  });

  //auth store data
  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  // TRnotification popup store data
  const { setTRpopupNotificationMsg } = useTRpopupNotificationStore();

  //ICnotification popup store data
  const { setICnotificationMsg } = useICnotificationMsgStore();

  const navigate = useNavigate();

  // Trigger animation
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const validateloginForm = () => {
    const loginFieldErrors: loginFeildDataProps = {
      email: '',
      newPassword: '',
    };

    // Email validation
    if (loginFormFieldData.email.trim().length === 0) {
      loginFieldErrors.email = 'Please Enter the Email';
    } else if (!loginFormFieldData.email.includes('@')) {
      loginFieldErrors.email = 'Email must contain @ symbol';
    } else if (!loginFormFieldData.email.includes('.')) {
      loginFieldErrors.email = 'Email must contain a domain extension (e.g., .com)';
    } else if (loginFormFieldData.email.indexOf('@') === 0) {
      loginFieldErrors.email = 'Email must have a username before @ symbol';
    } else if (loginFormFieldData.email.indexOf('@') === loginFormFieldData.email.length - 1) {
      loginFieldErrors.email = 'Email must have a domain after @ symbol';
    } else if (
      loginFormFieldData.email.split('@')[1] &&
      !loginFormFieldData.email.split('@')[1].includes('.')
    ) {
      loginFieldErrors.email = 'Email domain must include an extension (e.g., .com)';
    } else if (!/^[a-zA-Z0-9._-]+@/.test(loginFormFieldData.email)) {
      loginFieldErrors.email =
        'Email username can only contain letters, numbers, periods, underscores, and hyphens';
    } else if (!/@[a-zA-Z0-9.-]+\./.test(loginFormFieldData.email)) {
      loginFieldErrors.email =
        'Email domain can only contain letters, numbers, periods, and hyphens';
    } else if (!/\.[a-zA-Z]{2,6}$/.test(loginFormFieldData.email)) {
      loginFieldErrors.email = 'Email must end with a valid domain extension (2-6 letters)';
    }

    //otp field validation
    if (otpConfirmations.isOptSent) {
      if ((loginFormFieldData.otp ?? '').trim().length === 0) {
        loginFieldErrors.newPassword = 'Please enter the OTP';
      }
    }

    //new password field validation
    if (otpConfirmations.isOptVerified) {
      if ((loginFormFieldData.newPassword ?? '').trim().length === 0) {
        loginFieldErrors.newPassword = 'Please Enter the Password';
      }
    }

    //confirm new password field validation
    if (otpConfirmations.isOptVerified) {
      if ((loginFormFieldData.confirmNewPassword ?? '').trim().length === 0) {
        loginFieldErrors.confirmNewPassword = 'Please Enter the Confirm Password';
      } else if (loginFormFieldData.newPassword !== loginFormFieldData.confirmNewPassword) {
        loginFieldErrors.confirmNewPassword = 'Password does not match';
      }
    }

    return loginFieldErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormFieldData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setICnotificationMsg({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginFieldValidation = validateloginForm();
    setLoginFieldErrors(loginFieldValidation);

    if (Object.values(loginFieldValidation).some(error => error !== '')) {
      console.log('All fields are required');
      return;
    }

    setIsLoading(true);

    if (!otpConfirmations.isOptSent) {
      const response = await sendEmailOtp(
        loginFormFieldData.email,
        'reset password',
        'you password reseting'
      );
      if (response.success) {
        setOtpConfirmations(prevState => ({ ...prevState, isOptSent: true }));
        setICnotificationMsg({ success: response.message });
      } else {
        setICnotificationMsg({ error: response.message });
      }

      setIsLoading(false);
      return;
    }

    if (otpConfirmations.isOptSent && !otpConfirmations.isOptVerified) {
      const response = await verifyEmailOtp(loginFormFieldData.email, loginFormFieldData.otp || '');
      if (response.success) {
        setOtpConfirmations(prevState => ({ ...prevState, isOptVerified: true }));
        setICnotificationMsg({ success: response.message });
      } else {
        setICnotificationMsg({ error: response.message });
      }
      setIsLoading(false);
      return;
    }

    if (otpConfirmations.isOptSent && otpConfirmations.isOptVerified) {
      try {
        console.log('password changed');
        setICnotificationMsg({ success: 'Password changed Successfully' });
        setTRpopupNotificationMsg({ success: 'Password changed Successfully' });
        // navigate('/login');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    /*  try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/login`,
        {
          email: loginFormFieldData.email,
          password: loginFormFieldData.password,
        },
        { withCredentials: true }
      );
      const { data } = response;

      setICnotificationMsg({ success: data.message });
      setTRpopupNotificationMsg({ success: data.message });
      setIsSuccessLoginedIn(true);
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setICnotificationMsg({ error: error.response?.data.message || error.message });
      } else {
        setICnotificationMsg({ error: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
    } */
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
    <>
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
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                Email
              </span>
            </label>
            <input
              name="email"
              value={loginFormFieldData.email}
              onChange={e => handleInputChange(e)}
              placeholder="email"
              disabled={isLoading}
              className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loginFieldErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } ${isLoading ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
            />
            {loginFieldErrors.email && (
              <p className="text-red-600 text-sm mt-1">{loginFieldErrors.email}</p>
            )}
          </div>

          {/* otp and newPassword */}
          <div>
            <label
              htmlFor={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                  {!otpConfirmations.isOptVerified ? 'Enter OTP' : 'Enter New Password'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </span>
            </label>

            <input
              name={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
              id={!otpConfirmations.isOptVerified ? 'otp' : 'newPassword'}
              type={!otpConfirmations.isOptVerified ? 'number' : showPassword ? 'text' : 'password'}
              value={
                !otpConfirmations.isOptVerified
                  ? loginFormFieldData.otp
                  : loginFormFieldData.newPassword
              }
              onChange={e => handleInputChange(e)}
              placeholder={!otpConfirmations.isOptVerified ? 'OTP' : 'New Password'}
              disabled={isLoading || !otpConfirmations.isOptSent}
              className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  loginFieldErrors.newPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
            />
            {loginFieldErrors.newPassword && (
              <p className="text-red-600 text-sm mt-1" id="password-error">
                {loginFieldErrors.newPassword}
              </p>
            )}
          </div>

          {/* confirm new pasword */}
          {otpConfirmations.isOptVerified && (
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                <span className="flex justify-between items-center">
                  <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                    Confirm New Password
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </span>
              </label>

              <input
                name="confirmNewPassword"
                id="confirmNewPassword"
                type="password"
                value={loginFormFieldData.confirmNewPassword}
                onChange={e => handleInputChange(e)}
                placeholder="Confirm New Password"
                disabled={isLoading || !otpConfirmations.isOptSent}
                className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  loginFieldErrors.newPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {loginFieldErrors.confirmNewPassword && (
                <p className="text-red-600 text-sm mt-1" id="password-error">
                  {loginFieldErrors.confirmNewPassword}
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
                  : otpConfirmations.isOptSent && !otpConfirmations.isOptVerified
                  ? 'Verifying OTP...'
                  : 'Resetting Password...'}
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
    </>
  );
}

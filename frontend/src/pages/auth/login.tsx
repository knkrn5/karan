import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
// import { GoogleIcon, GithubIcon } from "../../icons/svgIcons";
import axios from 'axios';
import { ICnotificationMsg } from '../../components/notifications/ICnotificationMsg.js';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useTRpopupNotificationStore } from '../../stores/popup/TRpopupNotificationStore.js';
import { useICnotificationMsgStore } from '../../components/stores/ICnotificationMsgStore.js';

interface loginFeildDataProps {
  email: string;
  password: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [loginFormFieldData, setLoginFormFieldData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginFieldErrors, setLoginFieldErrors] = useState<loginFeildDataProps>({
    email: '',
    password: '',
  });

  const [isforgotPassword, setisforgotPassword] = useState<boolean>(false);

  //auth store data
  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);
  const { setIsSuccessLoginedIn } = useAuthStore();

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
      password: '',
    };

    // Email validation
    if (loginFormFieldData.email.trim().length === 0) {
      loginFieldErrors.email = 'Email is required';
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

    if (loginFormFieldData.password.trim().length === 0) {
      loginFieldErrors.password = 'Password is required';
    } else if (loginFormFieldData.password.length < 8) {
      loginFieldErrors.password = 'Password must be at least 8 characters';
    }

    return loginFieldErrors;
  };

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
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

      //notification popup filling
      setTRpopupNotificationMsg({ success: data.message });

      setIsSuccessLoginedIn(true);
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        setICnotificationMsg({ error: error.response?.data.message || error.message });
      } else {
        console.log(error);
        setICnotificationMsg({ error: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
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
    <>
      <div
        className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 w-full max-w-md transition-transform duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          Login
        </h2>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">login</span>
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
              // type="text"
              value={loginFormFieldData.email}
              onChange={e => handleInputChnage(e)}
              placeholder="Enter your email"
              disabled={isLoading}
              className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                loginFieldErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } ${isLoading ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
            />
            {loginFieldErrors.email && (
              <p className="text-red-600 text-sm mt-1">{loginFieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                  Password
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
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={loginFormFieldData.password}
              onChange={e => handleInputChnage(e)}
              placeholder="Enter your password"
              disabled={isLoading}
              className={`w-full mt-2 px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
                ${
                  loginFieldErrors.password
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                } ${isLoading ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
            />
            {loginFieldErrors.password && (
              <p className="text-red-600 text-sm mt-1" id="password-error">
                {loginFieldErrors.password}
              </p>
            )}
          </div>

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
                Signing in...
              </span>
            ) : !isforgotPassword ? (
              'Sign In'
            ) : (
              'Send OTP'
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
            onClick={() => setisforgotPassword(true)}
          >
            Forgot Password
          </button>
        </div>
        <ICnotificationMsg />
      </div>
    </>
  );
}

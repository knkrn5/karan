import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
// import { GoogleIcon, GithubIcon } from "../../icons/svgIcons";
import axios from 'axios';
import StatusNotifications from '../../utils/StatusNotifications.js';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthStore } from '../../stores/auth/authStore.js';
// import { useAuthCheck } from '../../hooks/authCheckHook.js';

interface loginFeildDataProps {
  email: string;
  password: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginFieldErrors, setLoginFieldErrors] = useState<loginFeildDataProps>({
    email: '',
    password: '',
  });

  const statusInfo = useAuthStore(state => state.statusInfoAuth);
  const { setIsSuccessLoginedIn, setStatusInfoAuth } = useAuthStore();

  const navigate = useNavigate();

  // Trigger animation on component mount
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
    if (email.trim().length === 0) {
      loginFieldErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      loginFieldErrors.email = 'Email must contain @ symbol';
    } else if (!email.includes('.')) {
      loginFieldErrors.email = 'Email must contain a domain extension (e.g., .com)';
    } else if (email.indexOf('@') === 0) {
      loginFieldErrors.email = 'Email must have a username before @ symbol';
    } else if (email.indexOf('@') === email.length - 1) {
      loginFieldErrors.email = 'Email must have a domain after @ symbol';
    } else if (email.split('@')[1] && !email.split('@')[1].includes('.')) {
      loginFieldErrors.email = 'Email domain must include an extension (e.g., .com)';
    } else if (!/^[a-zA-Z0-9._-]+@/.test(email)) {
      loginFieldErrors.email =
        'Email username can only contain letters, numbers, periods, underscores, and hyphens';
    } else if (!/@[a-zA-Z0-9.-]+\./.test(email)) {
      loginFieldErrors.email =
        'Email domain can only contain letters, numbers, periods, and hyphens';
    } else if (!/\.[a-zA-Z]{2,6}$/.test(email)) {
      loginFieldErrors.email = 'Email must end with a valid domain extension (2-6 letters)';
    }

    if (password.trim().length === 0) {
      loginFieldErrors.password = 'Password is required';
    } else if (password.length < 8) {
      loginFieldErrors.password = 'Password must be at least 8 characters';
    }

    return loginFieldErrors;
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
          email,
          password,
        },
        { withCredentials: true }
      );
      const { data } = response;
      setStatusInfoAuth({ success: data.message });
      setIsSuccessLoginedIn(true);
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        setStatusInfoAuth({ error: error.response?.data.message || error.message });
      } else {
        console.log(error);
        setStatusInfoAuth({ error: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setStatusInfoAuth({});
      }, 5000);
    }
  };

  /*   const authStatus = useAuthCheck();

  useEffect(() => {
    if (authStatus === true) {
      navigate('/profile', { replace: true });
    }
  }, [authStatus, navigate]); */

  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  useEffect(() => {
    if (isSuccessLoginedIn === true) {
      navigate('/profile', { replace: true });
    }
  }, [isSuccessLoginedIn, navigate]);

  if (isSuccessLoginedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          Login
        </h2>

        {/* Social Sign In Buttons */}
        {/* <div className="space-y-3 mb-6">
          <button
            onClick={}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            <GoogleIcon width={24} height={24} className="mr-2" />
            Sign in with Google
          </button>
          <button
            onClick={}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            <GithubIcon width={24} height={24} className="mr-2" />
            Sign in with GitHub
          </button>
        </div> */}

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">login</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Email/Password Sign In */}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
        <StatusNotifications statusInfo={statusInfo} />
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { ICnotificationMsg } from '../../components/notifications/ICnotificationMsg.js';
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useTRpopupNotificationStore } from '../../stores/popup/TRpopupNotificationStore.js';
import { useICnotificationMsgStore } from '../../stores/notificationMsg/ICnotificationMsgStore.js';
import { sendUserAgentDataEmail } from '../../utils/userAgentData.js';
import { validateEmailInputField } from '../../utils/inputFieldValidations.js';
import ToolTip from '../../components/ui/toolTip.js';

interface LoginFeildDataProps {
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

  const [loginFieldErrors, setLoginFieldErrors] = useState<LoginFeildDataProps>({
    email: '',
    password: '',
  });

  const [agreed, setAgreed] = useState<boolean>(false);

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
    const loginFieldErrors: LoginFeildDataProps = {
      email: '',
      password: '',
    };

    // Email validation
    const emailInputFieldError = validateEmailInputField(loginFormFieldData.email);
    if (emailInputFieldError) {
      loginFieldErrors.email = emailInputFieldError;
    }

    if (loginFormFieldData.password.trim().length === 0) {
      loginFieldErrors.password = 'Please Enter the Password';
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

    //check if user agreed to the data collection policy
    if (!agreed) {
      setICnotificationMsg({ info: 'Please agree to the data collection policy' });
      return;
    }

    setICnotificationMsg({});
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/login`,
        {
          email: loginFormFieldData.email.toLowerCase(),
          password: loginFormFieldData.password,
        },
        { withCredentials: true }
      );
      const { data } = response;

      setICnotificationMsg({ success: data.message });
      setTRpopupNotificationMsg({ success: data.message });
      setIsSuccessLoginedIn(true);
      navigate('/profile');

      //emailing user agent data
      await sendUserAgentDataEmail(
        loginFormFieldData.email,
        'New Sign-in Detected on Your KARAN Account',
        "We have detected a new login to your account. If this was you, no action is needed. If you don't recognize this activity, please secure your account immediately."
      );
      setTRpopupNotificationMsg({ success: 'User Agent Data Emailed' });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setICnotificationMsg({ error: error.response?.data.message ?? error.message });
      } else {
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
            value={loginFormFieldData.email}
            onChange={e => handleInputChange(e)}
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
            className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300"
          >
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
          </label>

          <input
            name="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={loginFormFieldData.password}
            onChange={e => handleInputChange(e)}
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
            <p className="text-red-600 text-sm mt-1">{loginFieldErrors.password}</p>
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

      {/* Data privacy tooltip */}
      <label className="flex items-center mt-2 mb-4 text-sm font-bold text-black dark:text-neutral-300 relative">
        <input
          type="checkbox"
          id="agree-checkbox"
          className="mr-2"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <span>I have read and agree to the data collection policy</span>
        <ToolTip
          tooltipIconStyling="w-5 mt-2 text-md text-black dark:text-white"
          tooltipBoxStyling={`right-0 top-full mt-1 w-64 p-2 before:content-[''] before:absolute before:-top-1.5 before:right-0.5  before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-gray-700`}
        >
          <div className=" p-3 rounded-lg shadow-md bg-gray-100 dark:bg-slate-800 border border-gray-200 max-w-md mx-auto">
            <h3 className="font-extrabold text-lg text-gray-800 dark:text-neutral-100 mb-3 pb-2 border-b border-gray-500 dark:border-neutral-400">
              Data Collection Policy:-
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-neutral-300">
              {[
                'Device and location information (e.g., platform, IP, and region)',
                'User agent data (e.g., browser, operating system, and device type)',
              ].map(requirement => (
                <li key={requirement} className="flex items-start ">
                  <FaRegCheckCircle className=" text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-left font-semibold">{requirement}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xm font-mono pt-2 border-t border-gray-500 dark:border-neutral-400 text-gray-600 dark:text-gray-400">
              We collect this data to enhance security and user experience. This data is not shared
              with any third parties.
            </p>
          </div>
        </ToolTip>
      </label>

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
          onClick={() => {
            navigate('/reset-password');
          }}
        >
          Forgot Password
        </button>
      </div>

      <ICnotificationMsg />
    </div>
  );
}

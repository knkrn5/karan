import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
// import { GoogleIcon, GithubIcon } from "../../icons/svgIcons";
import axios, { AxiosError } from 'axios';
import { FaRegEye, FaRegEyeSlash, FaRegSave, FaRegCheckCircle } from 'react-icons/fa';
import { FaRepeat } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import StatusNotifications from '../../utils/StatusNotifications';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserDataProps {
  firstName: string;
  lastName?: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<{
    onePassword: boolean;
    twoPassword: boolean;
  }>({
    onePassword: false,
    twoPassword: false,
  });

  const [registrationVerification, setRegistrationVerification] = useState<{
    isAccountCreated: boolean;
    isOptSent: boolean;
    isOptVerified: boolean;
  }>({
    isAccountCreated: false,
    isOptSent: false,
    isOptVerified: false,
  });

  const [userData, setUserData] = useState<UserDataProps>({
    firstName: '',
    lastName: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const [formFieldsError, setFormFieldsError] = useState<UserDataProps>({
    firstName: '',
    lastName: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const statusInfo = useAuthStore(state => state.statusInfoAuth);
  const { setStatusInfoAuth } = useAuthStore();

  const navigate = useNavigate();

  // Trigger animation on every mount
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  // Validate form fields and return errors
  const validateForm = useCallback(
    (data: UserDataProps): UserDataProps => {
      const errors: UserDataProps = {
        firstName: '',
        lastName: '',
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
      };

      // First name validation
      if (!data.firstName.trim()) {
        errors.firstName = 'First name is required';
      }

      // Email validation
      // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!data.email.includes('@')) {
        errors.email = 'Email must contain @ symbol';
      } else if (!data.email.includes('.')) {
        errors.email = 'Email must contain a domain extension (e.g., .com)';
      } else if (data.email.indexOf('@') === 0) {
        errors.email = 'Email must have a username before @ symbol';
      } else if (data.email.indexOf('@') === data.email.length - 1) {
        errors.email = 'Email must have a domain after @ symbol';
      } else if (data.email.split('@')[1] && !data.email.split('@')[1].includes('.')) {
        errors.email = 'Email domain must include an extension (e.g., .com)';
      } else if (!/^[a-zA-Z0-9._-]+@/.test(data.email)) {
        errors.email =
          'Email username can only contain letters, numbers, periods, underscores, and hyphens';
      } else if (!/@[a-zA-Z0-9.-]+\./.test(data.email)) {
        errors.email = 'Email domain can only contain letters, numbers, periods, and hyphens';
      } else if (!/\.[a-zA-Z]{2,6}$/.test(data.email)) {
        errors.email = 'Email must end with a valid domain extension (2-6 letters)';
      }

      // opt validation
      if (!data.otp.trim() && registrationVerification.isOptSent) {
        errors.otp = 'OTP is required';
      }

      // Password validation
      /* const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; */
      if (registrationVerification.isOptVerified) {
        if (!data.password) {
          errors.password = 'Password is required';
        } else if (data.password.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[A-Z])/.test(data.password)) {
          errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[a-z])/.test(data.password)) {
          errors.password = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*\d)/.test(data.password)) {
          errors.password = 'Password must contain at least one number';
        } else if (!/(?=.*[@$!%*?&])/.test(data.password)) {
          errors.password = 'Password must contain at least one special character';
        } else if (data.password.length > 50) {
          errors.password = 'Password can max be 50 characters long';
        }
      }

      // Confirm password validation
      if (registrationVerification.isOptVerified) {
        if (!data.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (data.password !== data.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
      }

      return errors;
    },
    [registrationVerification.isOptSent, registrationVerification.isOptVerified]
  );

  // Check if the form has any errors
  const hasErrors = useMemo(() => {
    const errors = validateForm(userData);
    return Object.values(errors).some(error => error !== '');
  }, [userData, validateForm]);

  async function verifyUser(email: string) {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/verify-user`, { email: email });
      setStatusInfoAuth({ error: res.data.message });
      console.log(res.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function sendOpt(userEmail: string) {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/auth/send-otp`,
        { email: userEmail },
        { withCredentials: true }
      );
      // console.log(res.data);
      setRegistrationVerification(prev => ({ ...prev, isOptSent: true }));
      return res.data.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function verifyOpt(otp: string) {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/auth/verify-otp`,
        { enteredOTP: otp },
        { withCredentials: true }
      );

      console.log('Verify OTP response:', res.data);

      if (res.data.success) {
        setRegistrationVerification(prev => {
          const newState = { ...prev, isOptVerified: true };
          console.log('Setting isOptVerified to true:', newState);
          return newState;
        });
        setStatusInfoAuth({ success: res.data.message });
        return true;
      } else {
        setStatusInfoAuth({ error: res.data.message || 'OTP verification failed' });
        setFormFieldsError(prev => ({
          ...prev,
          otp: res.data.message || 'OTP verification failed',
        }));

        return false;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setStatusInfoAuth({ error: error.response?.data.message || error.message });
      } else {
        console.log(error);
      }
      return false;
    } finally {
      setIsSigningUp(false);
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formFieldValidation = validateForm(userData);
    setFormFieldsError(formFieldValidation);

    if (hasErrors) {
      return;
    }

    setIsSigningUp(true);
    setStatusInfoAuth({});

    if (!registrationVerification.isAccountCreated) {
      const verifyUserRes = await verifyUser(userData.email);
      if (verifyUserRes) {
        setIsSigningUp(false);
        return;
      }
    }

    if (!registrationVerification.isOptSent) {
      const otpRes = await sendOpt(userData.email);
      setIsSigningUp(false);
      if (otpRes) {
        setStatusInfoAuth({ success: 'OTP sent successfully' });
      }
      return;
    }

    if (registrationVerification.isOptSent && !registrationVerification.isOptVerified) {
      const verifyResult = await verifyOpt(userData.otp);
      setIsSigningUp(false);
      if (!verifyResult) {
        return;
      }
      return;
    }

    if (registrationVerification.isOptVerified) {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, userData);
        const { data } = response;
        setStatusInfoAuth({ success: data.message });
        setRegistrationVerification(prev => ({ ...prev, isAccountCreated: true }));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.status);
          setStatusInfoAuth({
            error: error.response?.data.message || error.message,
          });
        } else {
          setStatusInfoAuth({ error: 'An unexpected error occurred' });
        }
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData(prev => ({ ...prev, [name]: value }));

      // Clear error for this field when user starts typing
      if (formFieldsError[name as keyof UserDataProps]) {
        setFormFieldsError(prev => ({ ...prev, [name]: '' }));
      }
    },
    [formFieldsError]
  );

  // Toggle password visibility
  const togglePasswordVisibility = useCallback((field: 'onePassword' | 'twoPassword') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const isSuccessLoginedIn = useAuthStore(state => state.isSuccessLoginedIn);

  useEffect(() => {
    if (registrationVerification.isAccountCreated || isSuccessLoginedIn === true) {
      navigate('/login', { replace: true });
    }

  }, [isSuccessLoginedIn, navigate, registrationVerification.isAccountCreated]);

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
        className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 my-4 w-full max-w-md transition-transform duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Heading */}
        <h2 className="text-center text-2xl font-extrabold text-gray-800 dark:text-white mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Please fill in the details to get started.
        </p>

        {/* Social Buttons */}
        {/* <div className=" flex flex-col gap-2 md:flex-row md:gap-4 justify-center mb-4">
          <button
            type="button"
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded flex items-center"
            aria-label="Sign up with Google"
          >
            <GoogleIcon width={24} height={24} className="mr-2" />
            Google
          </button>
          <button
            type="button"
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded flex items-center"
            aria-label="Sign up with Github"
          >
            <GithubIcon width={24} height={24} className="mr-2" />
            Github
          </button>
        </div> */}

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">Details</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="firstName"
                className="mb-1 block text-gray-700 dark:text-gray-300 after:ml-0.5 after:text-red-500 after:content-['*'] "
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                maxLength={20}
                placeholder="First name"
                disabled={isSigningUp}
                className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formFieldsError.firstName ? 'border border-red-500' : ''
                } ${isSigningUp ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                value={userData.firstName}
                onChange={handleChange}
              />
              {formFieldsError.firstName && (
                <p className="text-red-600 text-sm mt-1" id="firstName-error">
                  {formFieldsError.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="lastName" className="mb-1 block text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                maxLength={20}
                type="text"
                placeholder="Last Name"
                disabled={isSigningUp}
                className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isSigningUp ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 block text-gray-700 dark:text-gray-300">
              <span className="flex justify-between items-center">
                <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                  Email
                </span>
                <button
                  type="button"
                  title="edit email"
                  disabled={!registrationVerification.isOptSent}
                  onClick={() => {
                    setRegistrationVerification(prev => ({
                      ...prev,
                      isOptSent: false,
                      isOptVerified: false,
                    }));
                    setStatusInfoAuth({});
                  }}
                  className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                  aria-label={showPassword.onePassword ? 'Hide password' : 'Show password'}
                >
                  {registrationVerification.isOptSent ? <CiEdit /> : <FaRegSave />}
                </button>
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              disabled={
                isSigningUp ||
                registrationVerification.isOptSent ||
                registrationVerification.isOptVerified
              }
              className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed ${
                formFieldsError.email ? 'border border-red-500' : ''
              } ${isSigningUp ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
              value={userData.email}
              onChange={handleChange}
            />
            {formFieldsError.email && (
              <p className="text-red-600 text-sm mt-1" id="email-error">
                {formFieldsError.email}
              </p>
            )}
          </div>

          {/* password section */}
          {registrationVerification.isOptVerified ? (
            <div>
              {/* enter password */}
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 block text-gray-700 dark:text-gray-300">
                  <span className="flex justify-between items-center">
                    <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                      Password
                    </span>

                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('onePassword')}
                      className="focus:outline-none"
                      aria-label={showPassword.onePassword ? 'Hide password' : 'Show password'}
                    >
                      {!showPassword.onePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </span>
                </label>
                <input
                  id="password"
                  name="password"
                  maxLength={50}
                  type={showPassword.onePassword ? 'text' : 'password'}
                  placeholder="Password"
                  disabled={isSigningUp}
                  className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formFieldsError.password ? 'border border-red-500' : ''
                  } ${isSigningUp ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                  value={userData.password}
                  onChange={handleChange}
                />
                {formFieldsError.password && (
                  <p className="text-red-600 text-sm mt-1" id="password-error">
                    {formFieldsError.password}
                  </p>
                )}
                {userData.password && !formFieldsError.password && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Password strength:</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                      <div
                        className={`h-full rounded-full ${
                          userData.password.length > 12 &&
                          /(?=.*[A-Z])/.test(userData.password) && //uppercase
                          /(?=.*\d)/.test(userData.password) && //number
                          /(?=.*[@$!%*?&])/.test(userData.password) //special character
                            ? 'bg-green-500 w-full'
                            : userData.password.length >= 8 &&
                              /(?=.*[A-Z])/.test(userData.password) && //uppercase
                              /(?=.*\d)/.test(userData.password) && //number
                              /(?=.*[@$!%*?&])/.test(userData.password) //special character
                            ? 'bg-yellow-500 w-2/3'
                            : 'bg-red-500 w-1/3'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* confirm password */}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-gray-700 dark:text-gray-300"
                >
                  <span className="flex justify-between">
                    <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                      Confirm Password
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('twoPassword')}
                      className="focus:outline-none"
                    >
                      {!showPassword.twoPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.twoPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  disabled={isSigningUp}
                  className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formFieldsError.confirmPassword ? 'border border-red-500' : ''
                  } ${isSigningUp ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                  aria-label={
                    showPassword.twoPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                {formFieldsError.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1" id="confirmPassword-error">
                    {formFieldsError.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* OTP field */}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-gray-700 dark:text-gray-300"
                >
                  <span className="flex justify-between">
                    <span className="flex items-center after:ml-0.5 after:text-red-500 after:content-['*']">
                      Enter OTP
                    </span>
                    <button
                      type="button"
                      title="resend otp"
                      disabled={!registrationVerification.isOptSent}
                      onClick={() => {}}
                      className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                    >
                      {!registrationVerification.isOptSent ? <FaRegCheckCircle /> : <FaRepeat />}
                    </button>
                  </span>
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  placeholder="OTP"
                  disabled={!registrationVerification.isOptSent}
                  className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  ${
                    formFieldsError.otp ? 'border border-red-500' : ''
                  }`}
                  aria-label="Enter OTP"
                  value={userData.otp}
                  onChange={handleChange}
                />
                {formFieldsError.otp && (
                  <p className="text-red-600 text-sm mt-1" id="confirmPassword-error">
                    {formFieldsError.otp}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`${
              isSigningUp ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-2 px-4 rounded-lg w-full flex justify-center items-center cursor-pointer`}
          >
            {isSigningUp ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {!registrationVerification.isOptSent
                  ? 'Sending OTP...'
                  : registrationVerification.isOptSent && !registrationVerification.isOptVerified
                  ? 'Verifying OTP...'
                  : 'Signing Up...'}
              </>
            ) : (
              <>
                {!registrationVerification.isOptSent
                  ? 'Send OTP'
                  : registrationVerification.isOptSent && !registrationVerification.isOptVerified
                  ? 'Verify OPT'
                  : 'Sign Up'}
                <i className="fas fa-arrow-right ml-2"></i>
              </>
            )}
          </button>
        </form>

        {/* Sign in Link */}
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <Link className="text-blue-600 hover:text-blue-700" to="/login">
            Sign in
          </Link>
        </div>
        <StatusNotifications statusInfo={statusInfo} />
      </div>
    </>
  );
}

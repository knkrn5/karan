import axios, { AxiosError } from 'axios';
import { useProfileStore } from '../stores/profile/profileStore';
import { useAuthStore } from '../stores/auth/authStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ApiResponseTypes<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// === VERIFY EXISTING USER ===
export async function verifyExistingUser(userEmail: string): Promise<ApiResponseTypes<null>> {
  try {
    const response = await axios.post<ApiResponseTypes<null>>(
      `${BACKEND_URL}/api/v1/auth/verify-user`,
      { email: userEmail }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error('Verify User Error:', error.response?.data);
      return error.response?.data;
    }
    // Handling non-Axios or unexpected error and Fallback response
    console.error('Unexpected error verifying user:', error);
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error verifying user',
      data: null,
    };
  }
}

// === SEND OTP ===
export async function sendEmailOtp(
  email: string,
  subject: string,
  excerpt: string
): Promise<ApiResponseTypes<string | number | null>> {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/auth/send-email-otp`,
      { email, subject, excerpt },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error('Sending OTP Error:', error.response?.data);
      return error.response?.data;
    }
    // Handling non-Axios or unexpected error
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error occurred sending OTP',
      data: null,
    };
  }
}

// === VERIFY OTP ===
export async function verifyEmailOtp(
  userEmail: string,
  enteredOTP: string
): Promise<ApiResponseTypes<null>> {
  try {
    const response = await axios.post<ApiResponseTypes<null>>(
      `${BACKEND_URL}/api/v1/auth/verify-email-otp`,
      { email: userEmail, otp: enteredOTP },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error('Verify OTP Error:', error.response?.data);
      return error.response?.data;
    }

    // Handling non-Axios or unexpected error
    console.error('Unexpected error verifying OTP:', error);
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error occurred verifying OTP',
      data: null,
    };
  }
}

// === VERIFY PASSWORD ===
export async function verifyPassword(password: string): Promise<ApiResponseTypes<null>> {
  try {
    const response = await axios.post<ApiResponseTypes<null>>(
      `${BACKEND_URL}/api/v1/auth/verify-password`,
      { password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error('Verify Password Error:', error.response?.data);
      return error.response?.data;
    }

    // Handling non-Axios or unexpected error
    console.error('Unexpected error verifying password:', error);
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error occurred verifying password',
      data: null,
    };
  }
}

// === LOGOUT USER ===
export async function logout(): Promise<ApiResponseTypes<null>> {
  try {
    const response = await axios.post<ApiResponseTypes<null>>(
      `${BACKEND_URL}/api/v1/auth/logout`,
      {},
      { withCredentials: true }
    );

    //clearing stores and localstorage
    useAuthStore.getState().resetAuthStore();
    useProfileStore.getState().resetProfileStore();
    localStorage.removeItem('session');
    // navigate('/login');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.error('Logout User Error:', error.response?.data);
      return error.response?.data;
    }

    // Handling non-Axios or unexpected error
    console.error('Unexpected error logging out user:', error);
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error occurred logging out user',
      data: null,
    };
  }
}

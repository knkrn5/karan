import axios, { AxiosError } from 'axios';

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
      message: 'Unexpected error occurred',
      data: null,
    };
  }
}

// === SEND OTP ===
export async function sendOtp(
  userEmail: string,
  purpose: string
): Promise<ApiResponseTypes<string | number | null>> {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/auth/send-otp`,
      { email: userEmail, reason: purpose },
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
      message: 'Unexpected error occurred',
      data: null,
    };
  }
}

// === VERIFY OTP ===
export async function verifyOtp(
  userEmail: string,
  enteredOTP: string
): Promise<ApiResponseTypes<null>> {
  try {
    const response = await axios.post<ApiResponseTypes<null>>(
      `${BACKEND_URL}/api/v1/auth/verify-otp`,
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
      message: 'Unexpected error occurred',
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
      message: 'Unexpected error occurred',
      data: null,
    };
  }
}

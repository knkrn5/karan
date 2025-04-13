import { IoLogOut } from 'react-icons/io5';
import axios from 'axios';
// import { useNavigate } from 'react-router';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useProfileStore } from '../../stores/profile/profileStore';
import { useAuthStore } from '../../stores/auth/authStore';
import { useNotificationPopupStore } from '../../stores/popup/TRnotificationPopupStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Logout() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTRnotificationMsg } = useNotificationPopupStore();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      // reseting/clearing stores
      useAuthStore.getState().resetAuthStore();
      useProfileStore.getState().resetProfileStore();
      setTRnotificationMsg({ success: res.data.message });
      console.log('logging Out');
      localStorage.removeItem('session');
      // navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        aria-label="Logout"
        type="button"
        title="Logout"
        className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md cursor-pointer duration-300 hover:bg-blue-800"
        onClick={handleLogout}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 " />
        ) : (
          <IoLogOut className="w-5 h-5 duration-300 hover:scale-125" />
        )}
      </button>
    </>
  );
}

import { IoLogOut } from 'react-icons/io5';
import axios from 'axios';
// import { useProfileStore } from '../../stores/auth/authUserProfileStore';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useProfileStore } from '../../stores/auth/profileStore';


// import { useNavigate } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Logout() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true });
      console.log(response);
      // Clearing all state in zustand
      // useProfileStore.getState().setIsSuccessLoginedIn(false);
      useProfileStore.getState().resetProfileStore();
      localStorage.removeItem('isSuccessLoginedInLs');
      console.log('logging Out');
    } catch (error) {
      console.log(error);
    } finally {
      // navigate('/');
      window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <>
      <button type="button" title="Logout" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md cursor-pointer duration-300 hover:bg-blue-800" onClick={handleLogout}>
        {isLoading ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 " /> : <IoLogOut className="w-5 h-5 duration-300 hover:scale-125" />}
      </button>
    </>
  );
}

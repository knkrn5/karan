import { IoLogOut } from 'react-icons/io5';
import axios from 'axios';
import { useProfileStore } from '../../stores/auth/authUserProfileStore';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
      console.log(response);
      useProfileStore.getState().setIsSuccessLoginedIn(false);
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <>
      <button type="button" title="Logout" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md cursor-pointer duration-300 hover:bg-blue-800" onClick={handleLogout}>
        <IoLogOut className="w-5 h-5 duration-300 hover:scale-125" />
      </button>
    </>
  );
}

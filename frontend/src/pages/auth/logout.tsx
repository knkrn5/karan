import { IoLogOut } from 'react-icons/io5';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useTRpopupNotificationStore } from '../../stores/popup/TRpopupNotificationStore';
import { logout } from '../../utils/auth.utils';

export default function LogoutUser() {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { setTRpopupNotificationMsg } = useTRpopupNotificationStore();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      setTRpopupNotificationMsg({ success: response.message });
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <button
        aria-label="Logout"
        type="button"
        title="Logout"
        className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md cursor-pointer duration-300 hover:bg-blue-800"
        onClick={() => {
          setIsLoggingOut(true);
          handleLogout();
        }}
      >
        {isLoggingOut ? (
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 " />
        ) : (
          <IoLogOut className="w-5 h-5 duration-300 hover:scale-125" />
        )}
      </button>
    </>
  );
}

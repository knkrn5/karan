import { useNavigate } from 'react-router';
import { FaUnlockAlt } from 'react-icons/fa';

export default function AuthPopup() {
  const navigate = useNavigate();

  return (
    <div className="relative  w-full max-w-md max-h-full">
      <div className="relative bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
        <div className="p-4 text-center">
          <FaUnlockAlt className="mx-auto mb-4 text-gray-600 w-12 h-12 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
            Please Log In to send/see a message
          </h3>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800  outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium rounded-lg  text-gray-900 outline-none bg-gray-300 hover:bg-gray-400  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-900 duration-300 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router';

export default function AuthPopup() {
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative  w-full max-w-md max-h-full">
        <div className="relative bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
          <div className="p-4 text-center">
            <svg
              className="mx-auto mb-4 text-gray-600 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
              Please Log In to send a message
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
    </div>
  );
}

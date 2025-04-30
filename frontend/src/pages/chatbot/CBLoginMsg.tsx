import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router';

export default function CBLoginMsg() {
  return (
    <div className="p-4 mb-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600">
      <h3 className="font-bold text-yellow-800 dark:text-yellow-200">Login Required</h3>
      <p className="text-yellow-800 dark:text-yellow-200">
        You've reached the limit of 3 messages. Please login to continue using the chatbot.
      </p>
      <div className={`mt-2`}>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiLogIn className="mr-2 h-5 w-5 text-blue-500" />
              Account Required
            </h3>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Please log in to continue using the chatbot. and access all features.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={'/login'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors"
            >
              <FiLogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
            <Link
              to={'/signup'}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md flex items-center justify-center transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

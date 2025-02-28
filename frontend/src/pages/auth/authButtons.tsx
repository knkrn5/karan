import { Link } from "react-router";

export default function authButtons() {
  return (
    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
      <Link
        to="/login"
        className="text-gray-800 dark:text-white border-2 border-gray-400 dark:border-gray-500 duration-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Sign up
      </Link>
    </div>
  );
}

import { Link, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-md text-center">
        {/* Animated Error Code */}
        <h1 className="text-8xl font-extrabold text-blue-600 dark:text-blue-400">
          404
        </h1>

        {/* Error Message */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Oops! Page not found.
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Decorative Illustration */}
        <div className="mt-8 flex justify-center">
          <img src="/svgs/404.svg" alt="404 Error" className="bg-transparent" />
        </div>

        {/* Back to Button */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

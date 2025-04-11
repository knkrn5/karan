import { Link, useNavigate } from 'react-router';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800 px-6">
      <div className="max-w-md text-center">
        {/* Animated Error Code */}
        <h1 className="text-8xl font-extrabold text-red-600 dark:text-red-400">500</h1>

        {/* Error Message */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Oops! No Posts Found.
        </h2>
        <p className="mt-2 text-lg text-red-500">Failed to Load the Blog Posts. Please try again later.</p>

        {/* Decorative Illustration */}
        <div className="flex justify-center">
          <img src="/icons/svgs/server-error.svg" alt="server Error" className="bg-transparent w-100" />
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

export default ServerErrorPage;

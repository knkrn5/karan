import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/authUserProfileStore.js';
import Profiletest from './profiletest.js';

export default function UserAccount() {
  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  return (
    <>
      <div className="bg-white dark:bg-gray-800 text-center p-6 rounded-lg shadow-lg hover:drop-shadow-2xl duration-300">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 mx-auto mb-4"
        >
          <circle cx="50" cy="50" r="40" className="fill-gray-300 dark:fill-gray-600" />
          <text
            x="50%"
            y="55%"
            fontSize="40"
            fontFamily="Arial, sans-serif"
            className="fill-gray-800 dark:fill-white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {letter}
          </text>
        </svg>
        <h2 className="text-gray-900 dark:text-white text-sm font-extrabold">
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-5">{email}</p>
       
        <button>
          <Link
            to="/"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Home
          </Link>
        </button>
      </div>
      <div className='p-4'>
        <Profiletest />
      </div>
    </>
  );
}

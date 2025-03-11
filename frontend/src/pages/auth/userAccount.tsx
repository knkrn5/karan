import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/authUserProfileStore.js';
import { AnimatedLetterSvg, UserAccoutbgSvg } from '../../icons/animatedLetterSvg.js';

export default function UserAccount() {
  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-100 p-2 flex items-center justify-center dark:bg-gray-800">
      <div className="mx-auto bg-gray-900 text-white rounded-lg overflow-hidden w-80">
        <UserAccoutbgSvg />

        <div className="flex justify-center -mt-12">
          <AnimatedLetterSvg letter={letter} />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-xl font-extrabold">
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </h2>
          <p className="text-gray-400">{email}</p>
        </div>
        {/* <div className="flex justify-around mt-4 text-gray-400">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">34K</h3>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">187</h3>
            <p>Follows</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">1.6K</h3>
            <p>Posts</p>
          </div>
        </div> */}
        <div className="flex flex-col gap-5 md:flex-row justify-center md:gap-4 my-5">
          <button>
            <Link
              to="/"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Reset Password
            </Link>
          </button>
          <button>
            <Link
              to="/"
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Delete Account
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

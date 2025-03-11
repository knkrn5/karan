import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/authUserProfileStore.js';
import { AnimatedLetterSvg } from '../../icons/animatedLetterSvg.js';

export default function UserAccount() {
  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const email = useProfileStore(state => state.email);

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden w-80">
      <img
        alt="Background image showing code snippets"
        className="w-full h-24 object-cover"
        height={100}
        src="https://storage.googleapis.com/a1aa/image/dEv1WfgrKpRaYt7Ft3beBze7HHrXycJJGZEEmuHZvT4.jpg"
        width={320}
      />
      <div className="flex justify-center -mt-12">
        <AnimatedLetterSvg letter={letter} />
      </div>
      <div className="text-center mt-2">
        <h2 className="text-xl font-extrabold">
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </h2>
        <p className="text-gray-400">{email}</p>
      </div>
      <div className="flex justify-around mt-4 text-gray-400">
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
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button>
          <Link
            to="/"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Home
          </Link>
        </button>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/authUserProfileStore.js';

export default function Profiletest() {
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
        <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/*     <!-- Gradient definitions --> */}
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#8a2be2" />
              <stop offset="100%" stopColor="#ff0080" />
            </linearGradient>

            {/*         <!-- Filter for glow effect --> */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/*         <!-- Animation for pulsing --> */}
            <animate
              id="pulseAnimation"
              attributeName="r"
              from="40"
              to="45"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            />
          </defs>

          {/*     <!-- Background circle with gradient and animation --> */}
          <circle cx="100" cy="100" r="80" fill="url(#circleGradient)">
            <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>

          {/*     <!-- Inner circle --> */}
          <circle cx="100" cy="100" r="70" fill="#ffffff" opacity="0.3">
            <animate attributeName="r" values="70;75;70" dur="4s" repeatCount="indefinite" />
          </circle>

          {/*     <!-- Decorative rings --> */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="3"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="502"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="5,15;10,10;15,5"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>

          {/*     <!-- Letter with gradient and glow --> */}
          <text
            x="50%"
            y="55%"
            fontSize="80"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fill="url(#textGradient)"
            textAnchor="middle"
            dominantBaseline="middle"
            filter="url(#glow)"
          >
            {letter}
            <animate
              attributeName="font-size"
              values="80;82;80"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>

          {/*     <!-- Decorative particles --> */}
          <g>
            <circle cx="130" cy="70" r="4" fill="#f59e0b">
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="70" cy="130" r="4" fill="#60a5fa">
              <animate
                attributeName="opacity"
                values="1;0.2;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="150" cy="120" r="3" fill="#f472b6">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="50" cy="70" r="3" fill="#34d399">
              <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
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

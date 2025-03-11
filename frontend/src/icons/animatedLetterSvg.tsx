export function AnimatedLetterSvg({ letter }: { letter: string }) {
  return (
    <div>
      <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/*         <!-- Gradient definitions --> */}
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

          {/*                 <!-- Filter for glow effect --> */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/*                 <!-- Animation for pulsing --> */}
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

        {/*         <!-- Background circle with gradient and animation --> */}
        <circle cx="100" cy="100" r="80" fill="url(#circleGradient)">
          <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>

        {/*         <!-- Inner circle --> */}
        <circle cx="100" cy="100" r="70" fill="#ffffff" opacity="0.3">
          <animate attributeName="r" values="70;75;70" dur="4s" repeatCount="indefinite" />
        </circle>

        {/*         <!-- Decorative rings --> */}
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

        {/*         <!-- Letter with gradient and glow --> */}
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
          <animate attributeName="font-size" values="80;82;80" dur="2s" repeatCount="indefinite" />
        </text>

        {/*         <!-- Decorative particles --> */}
        <g>
          <circle cx="130" cy="70" r="4" fill="#f59e0b">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="130" r="4" fill="#60a5fa">
            <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="120" r="3" fill="#f472b6">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="70" r="3" fill="#34d399">
            <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}

export function UserAccoutbgSvg() {
  return (
    <div>
      <svg viewBox="0 350 900 400" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Gradient definitions --> */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="accent1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <linearGradient id="accent2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          {/* <!-- Wave pattern --> */}
          <pattern
            id="wavePattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,100 C50,80 50,120 100,100 C150,80 150,120 200,100"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
            <path
              d="M0,150 C50,130 50,170 100,150 C150,130 150,170 200,150"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
            <path
              d="M0,50 C50,30 50,70 100,50 C150,30 150,70 200,50"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
          </pattern>

          {/* <!-- Filter for glow --> */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* <!-- Background --> */}
        <rect width="900" height="1600" fill="url(#bgGradient)" />
        <rect width="900" height="1600" fill="url(#wavePattern)" />

        {/* <!-- Background glow --> */}
        <circle cx="450" cy="800" r="500" fill="url(#glowGradient)" opacity="0.7" />

        {/* <!-- Abstract shapes --> */}
        <g opacity="0.9">
          {/* <!-- Main decorative circles --> */}
          <circle
            cx="450"
            cy="800"
            r="300"
            fill="none"
            stroke="url(#accent1)"
            strokeWidth="8"
            strokeDasharray="3,7"
          />
          <circle
            cx="450"
            cy="800"
            r="350"
            fill="none"
            stroke="url(#accent2)"
            strokeWidth="4"
            strokeDasharray="1,12"
          />
          <circle
            cx="450"
            cy="800"
            r="400"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeOpacity="0.5"
          />

          {/* <!-- Floating elements --> */}
          <circle cx="350" cy="600" r="40" fill="#f43f5e" opacity="0.8" />
          <circle cx="550" cy="950" r="55" fill="#4f46e5" opacity="0.8" />
          <circle cx="600" cy="600" r="35" fill="#22d3ee" opacity="0.7" />
          <circle cx="300" cy="1000" r="45" fill="#8b5cf6" opacity="0.7" />
          <circle cx="650" cy="750" r="25" fill="#f59e0b" opacity="0.7" />
          <circle cx="250" cy="750" r="25" fill="#10b981" opacity="0.7" />

          {/* <!-- Accent lines --> */}
          <line
            x1="150"
            y1="800"
            x2="750"
            y2="800"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeOpacity="0.3"
          />
          <line
            x1="450"
            y1="500"
            x2="450"
            y2="1100"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeOpacity="0.3"
          />

          {/* <!-- Curved accents --> */}
          <path
            d="M250,600 Q450,400 650,600"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeOpacity="0.6"
          />
          <path
            d="M250,1000 Q450,1200 650,1000"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeOpacity="0.6"
          />

          {/* <!-- Additional decorative elements --> */}
          <path
            d="M300,700 Q450,850 600,700"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <path
            d="M300,900 Q450,750 600,900"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
        </g>

        {/* <!-- Additional decorative elements scattered throughout --> */}
        <circle cx="200" cy="400" r="10" fill="#f43f5e" opacity="0.6" />
        <circle cx="700" cy="400" r="10" fill="#4f46e5" opacity="0.6" />
        <circle cx="200" cy="1200" r="10" fill="#22d3ee" opacity="0.6" />
        <circle cx="700" cy="1200" r="10" fill="#8b5cf6" opacity="0.6" />

        {/* <!-- Subtle background dots --> */}
        <g opacity="0.2">
          <circle cx="150" cy="300" r="3" fill="white" />
          <circle cx="300" cy="200" r="2" fill="white" />
          <circle cx="450" cy="250" r="3" fill="white" />
          <circle cx="600" cy="200" r="2" fill="white" />
          <circle cx="750" cy="300" r="3" fill="white" />
          <circle cx="150" cy="1300" r="3" fill="white" />
          <circle cx="300" cy="1400" r="2" fill="white" />
          <circle cx="450" cy="1350" r="3" fill="white" />
          <circle cx="600" cy="1400" r="2" fill="white" />
          <circle cx="750" cy="1300" r="3" fill="white" />
        </g>
      </svg>
    </div>
  );
}

import { Helmet } from 'react-helmet-async';

export function AboutPageSeoMetaTags() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>About Karan</title>
      <meta
        name="description"
        content="Learn more about Karan, an AI and Finance enthusiast who loves coding and collaborating on innovative projects."
      />
      <meta
        name="keywords"
        content="Karan, AI, Artificial Intelligence, Finance, Coding, Development, Projects, Collaboration"
      />
      <meta name="author" content="Karan" />
      <link rel="canonical" href="https://karan.email/about" />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="About Karan | AI, Finance, and Coding Enthusiast" />
      <meta
        property="og:description"
        content="Discover the passion and projects of Karan, an AI and Finance aficionado who enjoys coding and creating innovative solutions."
      />
      <meta property="og:image" content="https://karan.email/favicons/K.svg" />
      <meta property="og:url" content="https://karan.email/about" />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Karan | AI, Finance, and Coding Enthusiast" />
      <meta
        name="twitter:description"
        content="Get to know Karan, a developer passionate about AI and Finance, who loves to code and work on exciting projects."
      />
      <meta name="twitter:image" content="https://karan.email/favicons/K.svg" />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}

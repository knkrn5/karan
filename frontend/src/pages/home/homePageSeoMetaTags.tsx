import { Helmet } from 'react-helmet-async';

export function HomePageSeoMetaTags() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Portfolio - karan</title>
      <meta
        name="description"
        content="Explore the portfolio of Knkrn5, showcasing web development projects, AI applications, and financial psychology resources. Discover innovative solutions and technologies."
      />
      <meta
        name="keywords"
        content="web development, AI, artificial intelligence, portfolio, financial psychology, chatbots, APIs, programming projects, knkrn5"
      />
      <meta name="author" content="Knkrn5" />
      <link rel="canonical" href="https://karan.email/" />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Portfolio - Knkrn5 | Web Development & AI Projects" />
      <meta
        property="og:description"
        content="View a diverse range of projects including web development, AI chatbots, and financial insights. See what Knkrn5 is creating."
      />
      <meta property="og:image" content="https://karan.email/favicons/K.svg" />
      <meta property="og:url" content="https://yourwebsite.com" />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Portfolio - Knkrn5 | Web Development & AI Projects" />
      <meta
        name="twitter:description"
        content="Check out the projects of Knkrn5, featuring cutting-edge web development and AI solutions. Learn more!"
      />
      <meta name="twitter:image" content="https://karan.email/favicons/K.svg" />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}

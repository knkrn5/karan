import { Helmet } from 'react-helmet-async';

export function ResourcesPageSeoMetaTags() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Resources Used | Knkrn5 - Tools and Technologies</title>
      <meta
        name="description"
        content="Explore the essential tools and services used by Knkrn5 for project creation, including databases, hosting, CDNs, APIs, and more."
      />
      <meta
        name="keywords"
        content="resources, tools, technologies, database, hosting, CDN, CMS, chatbot API, version control, cloud providers, authentication"
      />
      <meta name="author" content="Knkrn5" />
      <link rel="canonical" href="https://karan.email/resources" />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Resources Used | Knkrn5 - Tools and Technologies" />
      <meta
        property="og:description"
        content="Discover the key tools and technologies Knkrn5 utilizes for creating innovative projects."
      />
      <meta property="og:image" content="https://karan.email/favicons/K.svg" />
      <meta property="og:url" content="https://yourwebsite.com/resources" />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Resources Used | Knkrn5 - Tools and Technologies" />
      <meta
        name="twitter:description"
        content="Learn about the essential resources Knkrn5 employs to build and deploy projects efficiently."
      />
      <meta name="twitter:image" content="https://karan.email/favicons/K.svg" />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}

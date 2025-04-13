import { Helmet } from 'react-helmet-async';

export function BlogPostsPageSeoMetaTags() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>AI & Finance Blog | karan.enail</title>
      <meta
        name="description"
        content="Read insightful blog posts on Artificial Intelligence and Finance by Knkrn5. Stay ahead with deep dives into technology, investing, automation, and market psychology."
      />
      <meta
        name="keywords"
        content="AI blog, finance blog, artificial intelligence, fintech, investing, personal finance, machine learning, automation, financial literacy, knkrn5 blog"
      />
      <meta name="author" content="Knkrn5" />
      <link rel="canonical" href="https://karan.email/blog" />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="AI & Finance Blog | karan.email" />
      <meta
        property="og:description"
        content="Explore blog posts covering the intersection of AI and finance, written by Knkrn5. Learn about the future of money, automation, and technology."
      />
      <meta property="og:image" content="https://karan.email/favicons/K.svg" />
      <meta property="og:url" content="https://karan.email/blog" />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI & Finance Blog | karan.email" />
      <meta
        name="twitter:description"
        content="Discover valuable content on AI and finance. From investing tips to AI tools, Knkrn5 brings practical and future-ready knowledge."
      />
      <meta name="twitter:image" content="https://karan.email/favicons/K.svg" />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}

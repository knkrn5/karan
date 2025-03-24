import { Helmet } from 'react-helmet-async';

export function HomeMetaTags() {
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

export function ResourcesMetaTags() {
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

export function ContactMetaTags() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Contact Karan</title>
      <meta
        name="description"
        content="Contact Knkrn5 for inquiries, support, or collaboration. Send a message with your name, email, and message. We are located in Delhi, India."
      />
      <meta
        name="keywords"
        content="contact, inquiry, support, email, message, Delhi, India, Knkrn5"
      />
      <meta name="author" content="Knkrn5" />
      <link rel="canonical" href="https://karan.email/contact" />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Contact Knkrn5 | Reach Out for Inquiries and Support" />
      <meta
        property="og:description"
        content="Get in touch with Knkrn5. Send us a message for inquiries or support. Located in Delhi, India."
      />
      <meta property="og:image" content="https://karan.email/favicons/K.svg" />
      <meta property="og:url" content="https://karan.email/contact" />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact Knkrn5 | Reach Out for Inquiries and Support" />
      <meta
        name="twitter:description"
        content="Contact Knkrn5 for inquiries or support. Send a message to get started. Located in Delhi, India."
      />
      <meta name="twitter:image" content="https://karan.email/favicons/K.svg" />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}

export function AboutMetaTags() {
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

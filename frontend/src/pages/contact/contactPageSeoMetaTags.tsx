import { Helmet } from 'react-helmet-async';

export function ContactPageSeoMetaTags() {
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

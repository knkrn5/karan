import { Helmet } from 'react-helmet-async';

export function BlogMetaTags(
  title: string,
  excerpt: string,
  tags: string,
  url: string,
  img_url: string
) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={excerpt} />
      <meta name="keywords" content={tags} />
      <meta name="author" content="knkrn5" />
      <link rel="canonical" href={url} />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image" content={img_url} />
      <meta property="og:url" content={url} />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
      <meta name="twitter:image" content={img_url} />
      <meta name="twitter:site" content="@ka_r_an5" />
    </Helmet>
  );
}



{/* <BlogMetaTags
title={soloPost?.title || 'custom_title'}
excerpt={soloPost?.excerpt || 'custom_excerpt'}
tags={soloPost?.tags || 'custom_tags'}
url={soloPost?.slug || 'custom_url'}
img_url={soloPost?.img_url || 'custom_img'}
/> */}
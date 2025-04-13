import { Helmet } from 'react-helmet-async';
import { BlogPostPropsType } from './blogPostsPage';

export function BlogMetaTags({ title, excerpt, tags, slug, featuredImage }: BlogPostPropsType) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={excerpt} />
      <meta name="keywords" content={tags} />
      <meta name="author" content="knkrn5" />
      <link rel="canonical" href={slug} />

      {/* Open Graph (OG) for Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image" content={featuredImage.fields.file.url} />
      <meta property="og:url" content={slug} />

      {/* Twitter Card for Twitter Sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
      <meta name="twitter:image" content={featuredImage.fields.file.url} />
      <meta name="twitter:site" content="@ka_r_an5" />
      <meta name="twitter:url" content={slug} />
    </Helmet>
  );
}


{
  /* <BlogMetaTags
title={soloPost?.title || 'blog post - karan.email'}
excerpt={soloPost?.excerpt?.split(' ').slice(0, 20).join(' ')  || 'personal blog posts'}
tags={soloPost?.tags || 'blog, post, content, karan.email, writing'}
slug={window.location.href}
featuredImage={
  soloPost?.featuredImage || {
    fields: {
      file: {
        url: '/favicons/K.svg',
        fileName: 'logo',
      },
    },
  }
}
/> */
}

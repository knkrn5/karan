import { useEffect, useState } from 'react';
import type { BlogPostPropsType } from './blogPage';
import axios from 'axios';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { useSearchParams } from 'react-router';
import { useNavigate, useParams } from 'react-router';
import { SoloBlogPostSkeletonLoadingTwo } from './blogSkeletonLoading';
import options from '../../utils/contentfulNodetypeOptions';
import { IoIosArrowBack } from 'react-icons/io';
import { CiShare2 } from 'react-icons/ci';
import { Document, TopLevelBlock, BLOCKS } from '@contentful/rich-text-types';
import { BlogMetaTags } from './blogSEO';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SoloBlogPost() {
  const [blogPosts, setBlogPosts] = useState<BlogPostPropsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //   const [searchParams] = useSearchParams();
  //   const slug = searchParams.get('slug');
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(`${BACKEND_URL}/api/blog/blog-posts`);

        if (!res.data || !res.data.data) {
          throw new Error('Invalid response format from API');
        }

        const fetchedBlogPosts = res.data.data.map(
          (posts: { fields: BlogPostPropsType }) => posts.fields
        );
        setBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();

    // Scroll page to very top
    scrollTo(0, 0);
  }, []);

  const soloPost = blogPosts.find(post => post?.slug === slug);

  return (
    <>
      <BlogMetaTags
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
      />
      <div className="min-h-screen  p-4 text-black dark:text-white bg-gray-200 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto mb-4">
          <div className="rounded-lg shadow-2xl dark:shadow-neutral-900 bg-gray-100 dark:bg-gray-900 p-4">
            {isLoading ? (
              <SoloBlogPostSkeletonLoadingTwo />
            ) : error ? (
              <div className="flex flex-col justify-center items-center text-center h-[70vh]">
                <h2 className="text-2xl font-bold mb-2">No Posts Found</h2>
                <p className="text-red-500">{error}</p>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer duration-300 transform"
                >
                  Go Back
                </button>
              </div>
            ) : !soloPost ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-2">No Posts Found</h2>
                <p>Blog post not found</p>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer duration-300 transform"
                >
                  Go Back
                </button>
              </div>
            ) : (
              <div className="mb-16">
                <h1 className="text-3xl font-bold font-serif">{soloPost.title}</h1>
                <p className="my-2 font-mono font-semibold text-xs text-gray-500 dark:text-gray-400">
                  {soloPost.publishedDate &&
                    new Date(soloPost.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                <div className="prose dark:prose-invert min-h-screen">
                  {soloPost.content ? (
                    (() => {
                      // Create a proper Document object from the content
                      const document: Document = {
                        nodeType: BLOCKS.DOCUMENT,
                        data: {},
                        content: Array.isArray(soloPost.content.content)
                          ? (soloPost.content.content as TopLevelBlock[])
                          : [],
                      };

                      try {
                        return documentToReactComponents(document, options);
                      } catch (error) {
                        console.error('Error rendering content:', error);
                        return <p>Error rendering content</p>;
                      }
                    })()
                  ) : (
                    <p>Content not available</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {!isLoading && !error && soloPost && (
            <div className="flex justify-between mt-4">
              <button
                type="button"
                title="back"
                className="py-2 group px-4 rounded-full text-sm font-semibold shadow-xl transition duration-200 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <span className="flex items-center gap-1">
                  <IoIosArrowBack className="my-auto transform transition-transform duration-300 group-hover:scale-110" />
                  Back
                </span>
              </button>

              <button
                type="button"
                title="share"
                className="py-2 group px-4 rounded-full text-sm font-semibold shadow-xl transition duration-200 bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                onClick={() => {
                  const url = window.location.href;
                  navigator.share({ url });
                }}
              >
                <span className="flex items-center gap-1">
                  <CiShare2 className="my-auto transform transition-transform duration-300 group-hover:scale-110" />
                  Share
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

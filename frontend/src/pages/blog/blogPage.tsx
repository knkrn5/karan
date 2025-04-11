import { useEffect, useState } from 'react';
import { BlogSkeletonLoading } from './blogSkeletonLoading';
import axios from 'axios';
import BlogPaginaton from './blogPaginaton';
import { useNavigate, useSearchParams } from 'react-router';
import BlogSearchAndCategory from './blogSearchAndCategory';
import type { Document } from '@contentful/rich-text-types';
import ServerErrorPage from '../errors/serverErrorPage';


export interface BlogPostPropsType {
  title: string;
  slug: string;
  publishedDate?: string;
  category?: string;
  tags: string;
  excerpt: string;
  featuredImage: {
    fields: {
      file: {
        url: string;
        fileName: string;
      };
    };
  };
  content?: {
    content: Document;
  };
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BlogPage() {
  const [isFetchingBlogPosts, setIsFetchingBlogPosts] = useState<boolean>(true);
  const [blogPosts, setBlogPosts] = useState<BlogPostPropsType[]>([]);
  const [NumberOfPosts, setNumberOfPosts] = useState<{ start: number; end: number }>({
    start: 0,
    end: 6,
  });
  const [error, setError] = useState<string | null>(null);

  const [searchOrCategoryValue, setSearchOrCategoryValue] = useState<string>('');

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsFetchingBlogPosts(true);
        setError(null);
        const res = await axios.get(`${BACKEND_URL}/api/blog/blog-posts`);
        const fetchedBlogPosts = res.data.data.map(
          (posts: { fields: BlogPostPropsType }) => posts.fields
        );

        setBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.log(error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsFetchingBlogPosts(false);
      }
    };

    fetchBlogPosts();
  }, [NumberOfPosts.start, NumberOfPosts.end]);

  // console.log(blogPosts.map((post: BlogPostPropsType) => console.log(post?.content?.content) ));

  useEffect(() => {
    const startNumber = searchParams.get('startNumber') || '0';
    const endNumber = searchParams.get('endNumber') || '6';

    setNumberOfPosts({ start: Number(startNumber), end: Number(endNumber) });
  }, [searchParams]);

  // Filtering the blog posts based on search or category value
  const filteredBlogPosts = blogPosts.filter((post: BlogPostPropsType) => {
    const title = post?.title || '';
    const category = post?.category || '';
    const tags = post?.tags || '';
    if (searchOrCategoryValue === '' || searchOrCategoryValue === 'All-Category') return true;
    return (
      title.toLowerCase().includes(searchOrCategoryValue.toLowerCase()) ||
      category.toLowerCase().includes(searchOrCategoryValue.toLowerCase()) ||
      tags.toLowerCase().includes(searchOrCategoryValue.toLowerCase())
    );
  });

  // Get the paginated posts
  const paginatedPosts = filteredBlogPosts.slice(NumberOfPosts.start, NumberOfPosts.end);

  return (
    <div className="relative flex flex-col gap-3 py-4 px-1 items-center bg-gray-200 dark:bg-gray-800 ">
      {/* Search & Category Filter */}
      <BlogSearchAndCategory
        setNumberOfPosts={setNumberOfPosts}
        setSearchOrCategoryValue={setSearchOrCategoryValue}
      />

      {/* Main Content Section */}
      <div className=" w-full max-w-[900px] text-gray-900 dark:text-gray-200">
        {/* card prototype */}
        {isFetchingBlogPosts ? (
          <div className="min-h-screen flex justify-evenly flex-wrap gap-4 w-full p-4 ">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogSkeletonLoading key={i} />
            ))}
          </div>
        ) : error ? (
          // server Error MsgPage
          <ServerErrorPage statusCode={500} errorMsg={error} />
        ) : filteredBlogPosts.length === 0 ? (
          <div className="min-h-[70vh] flex justify-center items-center w-full p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">No Posts Found</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn't find any blog posts matching your search criteria.
              </p>
              {searchOrCategoryValue && (
                <p className="mt-2">
                  Try searching for something else or{' '}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => setSearchOrCategoryValue('')}
                  >
                    clear your search
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className=" flex justify-evenly flex-wrap gap-4 w-full p-4 space-y-4 max-sm:space-y-1 ">
            {paginatedPosts.map((post: BlogPostPropsType, i: number) => (
              // <div key={i} onClick={() => navigate(`/blog/post/?slug=${post.slug}`)}>
              <div key={i} onClick={() => navigate(`/blog/post/${post.slug}`)}>
                <div
                  className="h-80 w-full sm:w-64 flex flex-col rounded-xl shadow-2xl shadow-neutral-600 dark:shadow-neutral-900 hover:-translate-y-1 transition-transform duration-300 overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-900"
                  title={post?.title ? post.title : 'No title available'}
                >
                  <img
                    title={post?.title || 'blog-post image'}
                    src={post.featuredImage?.fields.file?.url}
                    alt={post.featuredImage?.fields.file?.fileName}
                    // loading="lazy"
                    className="w-full h-40 rounded-t-xl bg-gray-200 dark:bg-gray-700 "
                  ></img>
                  <div className=" bg-gray-200 dark:bg-gray-900">
                    <h2 className=" rounded-md p-1 font-extrabold hover:text-blue-500 ">
                      {post.title}
                    </h2>
                    <div className="w-full h-full px-1 rounded-b-md  ">
                      {post.excerpt ? (
                        post.title.length > 90 ? (
                          post.excerpt.split(' ').slice(0, 7).join(' ') + '...'
                        ) : (
                          post.excerpt.split(' ').slice(0, 15).join(' ') + '...'
                        )
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 italic">
                          No excerpt available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {/* Pagination */}
        {filteredBlogPosts.length > 6 && (
          <BlogPaginaton blogPosts={filteredBlogPosts} setNumberOfPosts={setNumberOfPosts} />
        )}
      </div>
    </div>
  );
}

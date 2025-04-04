import { useEffect, useState } from 'react';
import { BlogSkeletonLoading } from './blogSkeletonLoading';
import axios from 'axios';
import BlogPaginaton from './blogPaginaton';
import { useSearchParams } from 'react-router';
import BlogSearchAndCategory from './blogSearchAndCategory';

export interface BlogPostPropsType {
  title: string;
  category: string;
  excerpt: string;
  featuredImage: {
    fields: {
      file: {
        url: string;
        fileName: string;
      };
    };
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

  const [searchOrCategoryValue, setSearchOrCategoryValue] = useState<string>('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // setIsFetchingBlogPosts(true);
        const res = await axios.get(`${BACKEND_URL}/api/blog/blog-posts`);
        const fetchedBlogPosts = res.data.data.map(
          (posts: { fields: BlogPostPropsType }) => posts.fields
        );

        setBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingBlogPosts(false);
      }
    };

    fetchBlogPosts();
  }, [NumberOfPosts.start, NumberOfPosts.end]);

  useEffect(() => {
    const startNumber = searchParams.get('startNumber') || '0';
    const endNumber = searchParams.get('endNumber') || '6';

    setNumberOfPosts({ start: Number(startNumber), end: Number(endNumber) });
  }, [searchParams]);

  return (
    <div className="realtive flex flex-col gap-3 py-4 px-1 items-center bg-gray-200 dark:bg-gray-800 ">
      {/* Search & Category Filter */}
      <BlogSearchAndCategory setSearchOrCategoryValue={setSearchOrCategoryValue} />

      {/* Main Content Section */}
      <div className=" w-full max-w-[900px] text-gray-900 dark:text-gray-200">
        {/* card prototype */}
        {isFetchingBlogPosts ? (
          <div className="min-h-screen  flex justify-evenly flex-wrap gap-4 w-full p-4 ">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogSkeletonLoading key={i} />
            ))}
          </div>
        ) : (
          <div className=" flex justify-evenly flex-wrap gap-4 w-full p-4 space-y-4 max-sm:space-y-1 ">
            {blogPosts
              .filter((post: BlogPostPropsType) => {
                const title = post?.title || '';
                const category = post?.category || '';
                if (searchOrCategoryValue === '' || searchOrCategoryValue === 'All-Category')
                  return true;
                return (
                  title.toLowerCase().includes(searchOrCategoryValue.toLowerCase()) ||
                  category.toLowerCase().includes(searchOrCategoryValue.toLowerCase())
                );
              })
              .slice(NumberOfPosts.start, NumberOfPosts.end)
              .map((post: BlogPostPropsType, i: number) => (
                <div key={i}>
                  <div
                    className="h-80 w-full sm:w-64 flex flex-col rounded-xl shadow-2xl shadow-neutral-600 dark:shadow-neutral-900 hover:-translate-y-1 transition-transform duration-300 overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-900"
                    title={post?.title ? post.title : 'No title available'}
                  >
                    <img
                      title={post?.title || 'blog-post image'}
                      src={post.featuredImage?.fields.file?.url}
                      alt={post.featuredImage?.fields.file?.fileName}
                      loading="lazy"
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
        {blogPosts.length > 6 && (
          <BlogPaginaton blogPosts={blogPosts} setNumberOfPosts={setNumberOfPosts} />
        )}
      </div>
    </div>
  );
}

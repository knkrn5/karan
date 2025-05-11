import { useNavigate } from 'react-router';
import type { BlogPostPropsType } from './blogPostsPage';
import { RelatedBlogPostSkeletonLoading } from './blogSkeletonLoading';

export default function RelatedBlogPosts({
  blogsPosts,
  soloPost,
}: Readonly<{
  blogsPosts: BlogPostPropsType[];
  soloPost?: BlogPostPropsType;
}>) {
  const navigate = useNavigate();

  const relatedBlogPosts = blogsPosts.filter((blog: BlogPostPropsType) => {
    const soloPosttagArray = (soloPost?.tags ?? '').split(/\s*,\s*/).map(tag => tag.toLowerCase());

    const blogTagArray =
      typeof blog.tags === 'string' ? blog.tags.split(/\s*,\s*/).map(tag => tag.toLowerCase()) : [];

    const hasMatchingTag = blogTagArray.some(tag => soloPosttagArray.includes(tag));
    const sameCategory = blog.category === soloPost?.category;
    const isDifferentPost = blog.slug !== soloPost?.slug;

    return (hasMatchingTag || sameCategory) && isDifferentPost;

    // return (
    //   (blogTagArray.some(tag => soloPosttagArray.includes(tag)) ||
    //     blog.category === soloPost?.category) &&
    //   blog.slug !== soloPost?.slug
    // );
  });

  return (
    <div className=" sm:w-50 pb-1 bg-white dark:bg-dark rounded ">
      <h3 className="text-2xl text-center pt-2 font-bold font-serif border-b border-neutral-500 dark:border-gray-500">
        Related Posts
      </h3>
      {relatedBlogPosts.map((post: BlogPostPropsType) => (
        <div
          key={post.slug}
          className="p-2 m-2 rounded-lg border border-neutral-500 dark:border-gray-500 bg-neutral-100 dark:bg-gray-900 hover:scale-101 duration-300 transition-transform cursor-pointer max-sm:grid max-sm:grid-cols-2"
          onClick={() => {
            navigate(`/blog/post/${post.slug}`);
            scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {post?.featuredImage?.fields?.file?.url && (
            <img
              src={post.featuredImage.fields.file.url}
              alt={post.title}
              className="p-1 rounded"
            />
          )}
          <h4 className="text-sm font-serif p-1 rounded bg-neutral-300 dark:bg-gray-800">
            {post.title}
          </h4>
        </div>
      ))}
      {blogsPosts.length === 0 &&
        Array(2)
          .fill(null)
          .map((_, index) => <RelatedBlogPostSkeletonLoading key={index} />)}
      {relatedBlogPosts.length === 0 && blogsPosts.length !== 0 && (
        <h3 className=" text-center pt-2  ">No Related Posts Found</h3>
      )}
    </div>
  );
}

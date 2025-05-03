import { useNavigate } from 'react-router';
import type { BlogPostPropsType } from './blogPostsPage';

export default function RelatedBlogPosts({
  blogsPosts,
  soloPost,
}: {
  blogsPosts: BlogPostPropsType[];
  soloPost?: BlogPostPropsType;
}) {
  const navigate = useNavigate();

  const relatedBlogPosts = blogsPosts.filter(
    (blog: BlogPostPropsType) =>
      (blog.category === soloPost?.category && blog.slug !== soloPost?.slug) ||
      (blog.tags === soloPost?.tags && blog.slug !== soloPost?.slug)
  );

  return (
    <div className=" sm:w-50 pb-1 bg-white dark:bg-dark rounded ">
      <h3 className="text-2xl text-center pt-2 font-bold font-serif border-b dark:border-gray-500">
        Related Posts
      </h3>
      {relatedBlogPosts.map((post: BlogPostPropsType) => (
        <div
          key={post.slug}
          className="p-2 m-2 rounded-lg border border-gray-500 bg-gray-900 hover:scale-101 duration-300 transition-transform cursor-pointer max-sm:grid max-sm:grid-cols-2"
          onClick={() => {
            navigate(`/blog/post/${post.slug}`);
            scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={post?.featuredImage?.fields.file.url} alt="" className="p-1 rounded" />
          <h4 className="text-sm font-serif p-1 rounded bg-gray-800">{post.title}</h4>
        </div>
      ))}
    </div>
  );
}

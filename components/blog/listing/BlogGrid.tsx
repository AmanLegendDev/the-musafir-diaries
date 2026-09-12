import BlogCard, { type BlogCardData } from "./BlogCard";

type Props = {
  blogs: BlogCardData[];
};

export default function BlogGrid({ blogs }: Props) {
  if (!blogs.length) {
    return null;
  }

  return (
    <div
      id="stories"
      className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
    >
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog._id || blog.slug}
          blog={blog}
          index={index}
        />
      ))}
    </div>
  );
}
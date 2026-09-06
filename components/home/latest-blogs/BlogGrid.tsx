import BlogCard from "./BlogCard";

import type {
  BlogGridProps,
} from "./types";

export default function BlogGrid({
  blogs,
}: BlogGridProps) {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
        />
      ))}
    </div>
  );
}
import connectDB from "@/lib/db";
import Blog from "@/models/blog.model";

import BlogListing from "@/components/admin/blogs/BlogListing";

export const dynamic = "force-dynamic";

async function getBlogs() {
  await connectDB();

  const blogs = await Blog.find({})
    .populate("category", "name")
    .sort({
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <BlogListing initialBlogs={blogs} />
  );
}
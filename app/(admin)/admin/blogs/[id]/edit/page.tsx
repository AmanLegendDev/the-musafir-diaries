import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Blog from "@/models/blog.model";

import EditBlogForm from "@/components/admin/blogs/EditBlogForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const blog = await Blog.findById(id)
    .populate("category", "name")
    .lean();

  if (!blog) {
    notFound();
  }

  const serializedBlog = JSON.parse(
    JSON.stringify(blog)
  );

  return (
    <EditBlogForm
      blog={serializedBlog}
    />
  );
}
import connectDB from "@/lib/db";
import Blog from "@/models/blog.model";
import "@/models/category.model";

export async function getPublishedBlogs() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  })
    .populate("category", "name slug")
    .sort({
      publishedAt: -1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(blogs));
}

export async function getFeaturedBlog() {
  await connectDB();

  const blog = await Blog.findOne({
    status: "published",
    featured: true,
  })
    .populate("category", "name slug")
    .sort({
      publishedAt: -1,
      createdAt: -1,
    })
    .lean();

  if (!blog) return null;

  return JSON.parse(JSON.stringify(blog));
}

export async function getBlogCategories() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  })
    .populate("category", "name slug")
    .select("category")
    .lean();

  const categoryMap = new Map<
    string,
    {
      _id: string;
      name: string;
      slug: string;
    }
  >();

  for (const blog of blogs) {
    const category = blog.category as
      | {
          _id?: unknown;
          name?: string;
          slug?: string;
        }
      | null
      | undefined;

    if (!category?._id || !category.name || !category.slug) {
      continue;
    }

    const id = String(category._id);

    if (!categoryMap.has(id)) {
      categoryMap.set(id, {
        _id: id,
        name: category.name,
        slug: category.slug,
      });
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export async function getBlogBySlug(slug: string) {
  await connectDB();

  const blog = await Blog.findOne({
    slug,
    status: "published",
  })
    .populate("category", "name slug")
    .lean();

  if (!blog) return null;

  return JSON.parse(JSON.stringify(blog));
}

export async function getRelatedBlogs(
  categoryId: string | null,
  currentSlug: string,
  limit = 3
) {
  await connectDB();

  const query: Record<string, unknown> = {
    status: "published",
    slug: { $ne: currentSlug },
  };

  if (categoryId) {
    query.category = categoryId;
  }

  const blogs = await Blog.find(query)
    .populate("category", "name slug")
    .sort({
      featured: -1,
      publishedAt: -1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(blogs));
}
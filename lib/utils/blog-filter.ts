export type BlogFilterItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  readTime: number;
  tags?: string[];
  publishedAt?: string | Date | null;
  createdAt?: string | Date | null;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;
};

export type BlogFilterOptions = {
  search?: string;
  category?: string;
  sort?: "latest" | "oldest" | "read-time";
};

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function getTime(value?: string | Date | null) {
  if (!value) return 0;

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
}

export function filterBlogs(
  blogs: BlogFilterItem[],
  options: BlogFilterOptions = {}
) {
  const search = normalize(options.search);
  const category = normalize(options.category);
  const sort = options.sort || "latest";

  let result = [...blogs];

  if (search) {
    result = result.filter((blog) => {
      const searchableContent = [
        blog.title,
        blog.excerpt,
        blog.author,
        blog.category?.name,
        blog.category?.slug,
        ...(blog.tags || []),
      ]
        .map(normalize)
        .join(" ");

      return searchableContent.includes(search);
    });
  }

  if (category) {
    result = result.filter(
      (blog) => normalize(blog.category?.slug) === category
    );
  }

  switch (sort) {
    case "oldest":
      result.sort(
        (a, b) =>
          getTime(a.publishedAt || a.createdAt) -
          getTime(b.publishedAt || b.createdAt)
      );
      break;

    case "read-time":
      result.sort((a, b) => {
        const aTime = Number(a.readTime) || 0;
        const bTime = Number(b.readTime) || 0;

        return aTime - bTime;
      });
      break;

    case "latest":
    default:
      result.sort(
        (a, b) =>
          getTime(b.publishedAt || b.createdAt) -
          getTime(a.publishedAt || a.createdAt)
      );
      break;
  }

  return result;
}
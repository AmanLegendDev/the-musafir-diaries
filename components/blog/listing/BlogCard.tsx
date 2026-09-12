import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogCardData = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  readTime: number;
  tags?: string[];
  publishedAt?: string | Date | null;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;
};

type Props = {
  blog: BlogCardData;
  index?: number;
};

function formatDate(date?: string | Date | null) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function BlogCard({ blog, index = 0 }: Props) {
  const publishedDate = formatDate(blog.publishedAt);

  return (
    <article className="group">
      <Link
        href={`/blogs/${blog.slug}`}
        className="block"
        aria-label={`Read ${blog.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#071A33]/5">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

          {/* Editorial number */}
          <div className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-full border border-white/25 bg-[#071A33]/35 px-2.5 text-[11px] font-semibold tracking-[0.12em] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071A33] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]">
          {blog.category?.name && (
            <span className="text-[#087E8B]">
              {blog.category.name}
            </span>
          )}

          {blog.category?.name && blog.readTime > 0 && (
            <span className="text-[#071A33]/20">•</span>
          )}

          {blog.readTime > 0 && (
            <span className="text-[#071A33]/40">
              {blog.readTime} min read
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold leading-[1.2] tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-[1.35rem]">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#071A33]/58">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#071A33]/40">
          {blog.author && <span>By {blog.author}</span>}

          {blog.author && publishedDate && (
            <span className="text-[#071A33]/20">•</span>
          )}

          {publishedDate && <span>{publishedDate}</span>}
        </div>
      </Link>
    </article>
  );
}
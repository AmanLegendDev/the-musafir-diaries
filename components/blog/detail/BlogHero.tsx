import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock3, CalendarDays } from "lucide-react";

type BlogHeroData = {
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  readTime: number;
  publishedAt?: string | Date | null;
  category?: {
    name?: string;
    slug?: string;
  } | null;
};

type Props = {
  blog: BlogHeroData;
};

function formatDate(date?: string | Date | null) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export default function BlogHero({ blog }: Props) {
  const publishedDate = formatDate(blog.publishedAt);

  return (
    <header className="bg-[#FAF9F5]">
      {/* Editorial intro */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Category */}
          {blog.category?.name && (
            <Link
              href={
                blog.category.slug
                  ? `/blog?category=${encodeURIComponent(
                      blog.category.slug
                    )}`
                  : "/blog"
              }
              className="inline-flex rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#087E8B] transition hover:bg-[#087E8B]/10"
            >
              {blog.category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#071A33] sm:text-5xl md:text-6xl lg:text-7xl">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8 lg:text-xl">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#071A33]/45">
            {blog.author && (
              <span className="font-medium text-[#071A33]/65">
                By {blog.author}
              </span>
            )}

            {blog.author && blog.readTime > 0 && (
              <span className="text-[#071A33]/20">•</span>
            )}

            {blog.readTime > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {blog.readTime} min read
              </span>
            )}

            {publishedDate && (
              <>
                <span className="text-[#071A33]/20">•</span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {publishedDate}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic image */}
      <div className="mx-auto max-w-[1440px] px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-[#071A33] sm:aspect-[16/9] sm:rounded-[2rem] lg:aspect-[2/1]">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1440px) 98vw, 1440px"
            className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.015]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/45 via-transparent to-[#071A33]/5" />

          {/* Bottom image label */}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
            <p className="max-w-xs text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-xs">
              The Musafir Journal
            </p>

            <a
              href="#article"
              aria-label="Continue reading"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
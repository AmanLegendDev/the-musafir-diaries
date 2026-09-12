import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type RelatedBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  readTime: number;
  publishedAt?: string | Date | null;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;
};

type Props = {
  blogs: RelatedBlog[];
  currentSlug: string;
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

export default function RelatedBlogs({
  blogs,
  currentSlug,
}: Props) {
  const relatedBlogs = blogs
    .filter((blog) => blog.slug !== currentSlug)
    .slice(0, 3);

  if (!relatedBlogs.length) {
    return null;
  }

  return (
    <section className="bg-[#FAF9F5] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
              Keep wandering
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#071A33] sm:text-4xl">
              More stories to explore.
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#071A33] transition hover:text-[#087E8B]"
          >
            View all stories
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {relatedBlogs.map((blog) => {
            const publishedDate = formatDate(blog.publishedAt);

            return (
              <article
                key={blog._id || blog.slug}
                className="group"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  aria-label={`Read ${blog.title}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#071A33]/5">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/35 via-transparent to-transparent" />

                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071A33] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

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

                  <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#071A33] transition-colors group-hover:text-[#087E8B]">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#071A33]/55">
                    {blog.excerpt}
                  </p>

                  {publishedDate && (
                    <p className="mt-4 text-xs text-[#071A33]/40">
                      {publishedDate}
                    </p>
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
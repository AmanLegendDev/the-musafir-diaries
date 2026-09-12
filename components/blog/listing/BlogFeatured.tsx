import Image from "next/image";
import Link from "next/link";

type FeaturedBlog = {
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
  blog: FeaturedBlog | null;
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

export default function BlogFeatured({ blog }: Props) {
  if (!blog) return null;

  const publishedDate = formatDate(blog.publishedAt);

  return (
    <section className="bg-[#FAF9F5] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
              Featured story
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#071A33] sm:text-4xl lg:text-5xl">
              Start your journey here.
            </h2>
          </div>

          <span className="hidden text-sm text-[#071A33]/50 sm:block">
            A story worth slowing down for
          </span>
        </div>

        <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(7,26,51,0.10)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Image */}
            <Link
              href={`/blogs/${blog.slug}`}
              className="relative block min-h-[340px] overflow-hidden sm:min-h-[460px] lg:min-h-[560px]"
              aria-label={`Read ${blog.title}`}
            >
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/50 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <span className="rounded-full border border-white/30 bg-[#071A33]/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Featured
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#087E8B]">
                {blog.category?.name && (
                  <span>{blog.category.name}</span>
                )}

                {blog.category?.name && blog.readTime > 0 && (
                  <span className="text-[#071A33]/20">•</span>
                )}

                {blog.readTime > 0 && (
                  <span>{blog.readTime} min read</span>
                )}
              </div>

              <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#071A33] sm:text-4xl lg:text-[2.8rem]">
                {blog.title}
              </h3>

              <p className="mt-5 text-base leading-7 text-[#071A33]/65 sm:text-lg sm:leading-8">
                {blog.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[#071A33]/50">
                {blog.author && <span>By {blog.author}</span>}

                {blog.author && publishedDate && (
                  <span className="text-[#071A33]/20">•</span>
                )}

                {publishedDate && <span>{publishedDate}</span>}
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#FAF9F5] px-3 py-1.5 text-xs font-medium text-[#071A33]/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blogs/${blog.slug}`}
                className="mt-9 inline-flex w-fit items-center gap-2 border-b border-[#071A33]/30 pb-1.5 text-sm font-semibold text-[#071A33] transition group-hover:border-[#087E8B] group-hover:text-[#087E8B]"
              >
                Read the story
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
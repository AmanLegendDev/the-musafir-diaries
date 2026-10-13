import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

export interface HomeJournal {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;

  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;

  author?: string;
  readTime?: number;
  featured?: boolean;
  status: "draft" | "published";
  publishedAt?: string | Date;
  createdAt?: string | Date;
}

interface JournalGridProps {
  posts: HomeJournal[];
}

function formatDate(date?: string | Date): string | null {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function JournalImage({
  post,
  sizes,
}: {
  post: HomeJournal;
  sizes: string;
}) {
  return (
    <Image
      src={post.featuredImage}
      alt={post.title}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
    />
  );
}

function FeaturedJournalCard({
  post,
}: {
  post: HomeJournal;
}) {
  const date = formatDate(post.publishedAt || post.createdAt);

  return (
    <article className="group relative min-h-[500px] overflow-hidden bg-[#071A33] sm:min-h-[560px] lg:min-h-[620px]">
      <Link
        href={`/blogs/${post.slug}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#F59E0B]"
        aria-label={`Read ${post.title}`}
      >
        <JournalImage
          post={post}
          sizes="(max-width: 1023px) 100vw, 58vw"
        />

        {/* Cinematic overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/35 to-transparent"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15"
        />

        {/* Featured badge */}
        <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
          <span className="inline-flex border border-white/25 bg-[#071A33]/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Featured Story
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
            {post.category?.name && (
              <span className="text-[#F59E0B]">
                {post.category.name}
              </span>
            )}

            {date && (
              <>
                {post.category?.name && (
                  <span aria-hidden="true" className="text-white/60">
                    •
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={12} aria-hidden="true" />
                  {date}
                </span>
              </>
            )}

            {typeof post.readTime === "number" && post.readTime > 0 && (
              <>
                <span aria-hidden="true" className="text-white/60">
                  •
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={12} aria-hidden="true" />
                  {post.readTime} min read
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              {post.excerpt}
            </p>
          )}

          {/* Bottom CTA */}
          <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
              Read story
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#071A33]">
              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SecondaryJournalCard({
  post,
  number,
}: {
  post: HomeJournal;
  number: string;
}) {
  const date = formatDate(post.publishedAt || post.createdAt);

  return (
    <article className="group overflow-hidden border border-[#071A33]/10 bg-white">
      <Link
        href={`/blogs/${post.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#087E8B]"
        aria-label={`Read ${post.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/8] overflow-hidden bg-[#071A33]">
          <JournalImage
            post={post}
            sizes="(max-width: 1023px) 100vw, 42vw"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071A33]/55 to-transparent"
          />

          <span
            aria-hidden="true"
            className="absolute right-5 top-5 font-serif text-3xl font-light text-white/60"
          >
            {number}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
            {post.category?.name && (
              <span className="text-[#087E8B]">
                {post.category.name}
              </span>
            )}

            {date && (
              <>
                {post.category?.name && (
                  <span aria-hidden="true" className="text-[#071A33]/40">
                    •
                  </span>
                )}

                <span className="text-[#071A33]/65">
                  {date}
                </span>
              </>
            )}
          </div>

          {/* Title + arrow */}
          <div className="mt-3 flex items-start justify-between gap-5">
            <h3 className="font-serif text-2xl font-medium leading-tight tracking-[-0.02em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-[27px]">
              {post.title}
            </h3>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#071A33]/10 text-[#071A33] transition-all duration-300 group-hover:border-[#087E8B] group-hover:bg-[#087E8B] group-hover:text-white">
              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#071A33]/70">
              {post.excerpt}
            </p>
          )}

          {/* Reading info */}
          {typeof post.readTime === "number" && post.readTime > 0 && (
            <div className="mt-5 flex items-center gap-1.5 border-t border-[#071A33]/10 pt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#071A33]/65">
              <Clock3 size={12} aria-hidden="true" />
              {post.readTime} min read
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function JournalGrid({ posts }: JournalGridProps) {
  const visiblePosts = posts
    .filter((post) => post.status === "published")
    .slice(0, 3);

  if (visiblePosts.length === 0) return null;

  const [featuredPost, ...secondaryPosts] = visiblePosts;

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Featured story */}
      <div className="lg:col-span-7">
        <FeaturedJournalCard post={featuredPost} />
      </div>

      {/* Secondary stories */}
      {secondaryPosts.length > 0 && (
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
          {secondaryPosts.map((post, index) => (
            <SecondaryJournalCard
              key={post._id}
              post={post}
              number={`0${index + 2}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import {
  CalendarDays,
  Clock3,
  FileText,
  Globe2,
  Star,
  Tag,
  UserRound,
  X,
} from "lucide-react";

interface PopulatedRef {
  _id: string;
  name: string;
}

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: PopulatedRef | null;
  author: string;
  tags: string[];
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  status: "draft" | "published";
  publishedAt?: string | null;
  createdAt: string;
}

interface Props {
  blog: BlogItem | null;
  onClose: () => void;
}

export default function ViewBlogModal({
  blog,
  onClose,
}: Props) {
  if (!blog) return null;

  const date =
    blog.publishedAt || blog.createdAt;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "—";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1597C7]">
              Blog Preview
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              Read-only content view
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto">
          {/* HERO */}
          <div className="relative aspect-[21/8] min-h-[190px] bg-[#071A33]">
            {blog.featuredImage ? (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <FileText className="h-12 w-12 text-white/30" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/20 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    blog.status === "published"
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {blog.status}
                </span>

                {blog.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-current text-[#F59E0B]" />
                    Featured
                  </span>
                )}
              </div>

              <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                {blog.title}
              </h2>
            </div>
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            {/* META */}
            <div className="grid gap-3 sm:grid-cols-4">
              <Meta
                icon={
                  <CalendarDays className="h-4 w-4" />
                }
                label="Published"
                value={formattedDate}
              />

              <Meta
                icon={
                  <Clock3 className="h-4 w-4" />
                }
                label="Read Time"
                value={`${blog.readTime} min`}
              />

              <Meta
                icon={
                  <UserRound className="h-4 w-4" />
                }
                label="Author"
                value={blog.author}
              />

              <Meta
                icon={
                  <Globe2 className="h-4 w-4" />
                }
                label="Category"
                value={
                  blog.category?.name || "Uncategorized"
                }
              />
            </div>

            {/* EXCERPT */}
            <section className="rounded-2xl bg-slate-50 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Excerpt
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {blog.excerpt}
              </p>
            </section>

            {/* TAGS */}
            {blog.tags?.length > 0 && (
              <section>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Tags
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      <Tag className="h-3 w-3 text-[#1597C7]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* CONTENT */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#1597C7]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Story Content
                </p>
              </div>

              <div
                className="prose prose-slate max-w-none rounded-2xl border border-slate-100 bg-white p-5 text-sm leading-7 sm:p-7"
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              />
            </section>

            {/* SEO */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-[#1597C7]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  SEO Preview
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    SEO Title
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {blog.seoTitle ||
                      blog.title ||
                      "Not configured"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    SEO Description
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {blog.seoDescription ||
                      blog.excerpt ||
                      "Not configured"}
                  </p>
                </div>
              </div>
            </section>

            {/* SLUG */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-400">
              <span>/blog/</span>

              <span className="font-medium text-slate-600">
                {blog.slug}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-[#1597C7]">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}
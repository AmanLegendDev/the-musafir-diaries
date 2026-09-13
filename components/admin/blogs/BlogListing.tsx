"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Hash,
  Search,
  Star,
  Tag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import PageHeader from "@/components/admin/shared/PageHeader";
import ViewBlogModal from "./ViewBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";

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
  updatedAt: string;
}

interface Props {
  initialBlogs: BlogItem[];
}

const ITEMS_PER_PAGE = 6;

export default function BlogListing({
  initialBlogs,
}: Props) {
  const [blogs, setBlogs] =
    useState<BlogItem[]>(initialBlogs);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "all" | "published" | "draft"
  >("all");

  const [page, setPage] = useState(1);

  const [viewBlog, setViewBlog] =
    useState<BlogItem | null>(null);

  const [deleteBlog, setDeleteBlog] =
    useState<BlogItem | null>(null);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !query ||
        blog.title
          .toLowerCase()
          .includes(query) ||
        blog.slug
          .toLowerCase()
          .includes(query) ||
        blog.author
          ?.toLowerCase()
          .includes(query) ||
        blog.category?.name
          ?.toLowerCase()
          .includes(query) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesStatus =
        status === "all" ||
        blog.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBlogs.length / ITEMS_PER_PAGE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedBlogs =
    filteredBlogs.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const total = blogs.length;

  const published = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const drafts = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const featured = blogs.filter(
    (blog) => blog.featured
  ).length;

  function handleDeleted(id: string) {
    setBlogs((current) =>
      current.filter(
        (blog) => blog._id !== id
      )
    );

    setDeleteBlog(null);
  }

  return (
    <>
      <PageHeader
        title="Blogs"
        description="Create, publish and manage travel stories, guides and editorial content."
        buttonText="Add Blog"
        buttonHref="/admin/blogs/new"
      />

      {/* ================= STATS ================= */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Stories"
          value={total}
          icon={<FileText className="h-5 w-5" />}
        />

        <StatCard
          label="Published"
          value={published}
          icon={
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          }
        />

        <StatCard
          label="Drafts"
          value={drafts}
          icon={
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          }
        />

        <StatCard
          label="Featured"
          value={featured}
          icon={
            <Star className="h-5 w-5 fill-current" />
          }
        />
      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search stories, categories, authors or tags..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(event) => {
                setStatus(
                  event.target.value as
                    | "all"
                    | "published"
                    | "draft"
                );
                setPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1597C7]"
            >
              <option value="all">
                All Stories
              </option>

              <option value="published">
                Published
              </option>

              <option value="draft">
                Drafts
              </option>
            </select>

            <div className="hidden h-11 items-center rounded-xl bg-slate-50 px-4 text-xs font-semibold text-slate-500 sm:flex">
              {filteredBlogs.length}{" "}
              {filteredBlogs.length === 1
                ? "story"
                : "stories"}
            </div>
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}

      <div className="mt-6">
        {paginatedBlogs.length === 0 ? (
          <EmptyState
            search={search}
            onClear={() => {
              setSearch("");
              setStatus("all");
              setPage(1);
            }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onView={() => setViewBlog(blog)}
                onDelete={() =>
                  setDeleteBlog(blog)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}

      {filteredBlogs.length > 0 && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {(currentPage - 1) *
                ITEMS_PER_PAGE +
                1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredBlogs.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredBlogs.length}
            </span>{" "}
            stories
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(
                    1,
                    current - 1
                  )
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon />
            </button>

            <div className="min-w-24 text-center text-xs font-semibold text-slate-600">
              Page {currentPage} of{" "}
              {totalPages}
            </div>

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    totalPages,
                    current + 1
                  )
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}

      <ViewBlogModal
        blog={viewBlog}
        onClose={() => setViewBlog(null)}
      />

      <DeleteBlogModal
        blog={deleteBlog}
        onClose={() => setDeleteBlog(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}

/* ========================================================= */
/* BLOG CARD */
/* ========================================================= */

function BlogCard({
  blog,
  onView,
  onDelete,
}: {
  blog: BlogItem;
  onView: () => void;
  onDelete: () => void;
}) {
  const date = blog.publishedAt || blog.createdAt;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "—";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8">
      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#071A33]">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText className="h-10 w-10 text-white/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
              blog.status === "published"
                ? "border-emerald-300/20 bg-emerald-500/15 text-emerald-100"
                : "border-amber-300/20 bg-amber-500/15 text-amber-100"
            }`}
          >
            {blog.status}
          </span>

          {blog.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
              <Star className="h-3 w-3 fill-current text-[#F59E0B]" />
              Featured
            </span>
          )}
        </div>

        {/* Category */}
        {blog.category?.name && (
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#071A33] shadow-sm">
              {blog.category.name}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formattedDate}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {blog.readTime} min read
          </span>
        </div>

        <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-7 tracking-tight text-[#071A33] transition group-hover:text-[#087E8B]">
          {blog.title}
        </h2>

        <p className="mt-2 line-clamp-3 min-h-[66px] text-sm leading-5 text-slate-500">
          {blog.excerpt}
        </p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33]/5 text-[#071A33]">
            <UserRound className="h-3.5 w-3.5" />
          </div>

          <span className="font-medium">
            {blog.author}
          </span>
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {blog.tags
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-500"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}

            {blog.tags.length > 3 && (
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-5 grid grid-cols-[1fr_1fr_auto] gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onView}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-[#1597C7]/30 hover:bg-[#1597C7]/5 hover:text-[#1597C7]"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>

          <Link
            href={`/admin/blogs/${blog._id}/edit`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#071A33] text-xs font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </Link>

          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${blog.title}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ========================================================= */
/* STAT */
/* ========================================================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1597C7]/10 text-[#1597C7]">
          {icon}
        </div>

        <span className="text-2xl font-bold text-[#071A33]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ========================================================= */
/* EMPTY */
/* ========================================================= */

function EmptyState({
  search,
  onClear,
}: {
  search: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <FileText className="h-6 w-6 text-slate-400" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#071A33]">
        {search
          ? "No stories found"
          : "No Blogs Found"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? "Try another search term or clear the filters."
          : "Start publishing travel stories and guides for your guests."}
      </p>

      {search && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl bg-[#071A33] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0D2747]"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M12.5 15 7.5 10l5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="m7.5 15 5-5-5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
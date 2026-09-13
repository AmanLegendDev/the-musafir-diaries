"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FolderTree,
  Hash,
  Search,
  Trash2,
} from "lucide-react";

import PageHeader from "@/components/admin/shared/PageHeader";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  status: "active" | "inactive";
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  initialCategories: CategoryItem[];
}

const ITEMS_PER_PAGE = 8;

export default function CategoryListing({
  initialCategories,
}: Props) {
  const [categories, setCategories] =
    useState(initialCategories);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [page, setPage] = useState(1);

  const [deleteCategory, setDeleteCategory] =
    useState<CategoryItem | null>(null);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name
          .toLowerCase()
          .includes(query) ||
        category.slug
          .toLowerCase()
          .includes(query) ||
        category.description
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        category.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCategories.length / ITEMS_PER_PAGE
    )
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedCategories =
    filteredCategories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const total = categories.length;

  const active = categories.filter(
    (category) => category.status === "active"
  ).length;

  const inactive = categories.filter(
    (category) => category.status === "inactive"
  ).length;

  function handleDeleteSuccess(id: string) {
    setCategories((current) =>
      current.filter(
        (category) => category._id !== id
      )
    );

    setDeleteCategory(null);
  }

  return (
    <>
      <PageHeader
        title="Categories"
        description="Organize travel packages and experiences with structured content categories."
        buttonText="Add Category"
        buttonHref="/admin/categories/new"
      />

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Categories"
          value={total}
          icon={<FolderTree className="h-5 w-5" />}
        />

        <StatCard
          label="Active"
          value={active}
          icon={
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          }
        />

        <StatCard
          label="Inactive"
          value={inactive}
          icon={
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          }
        />
      </div>

      {/* Toolbar */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-lg">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search categories..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(
                event.target.value as
                  | "all"
                  | "active"
                  | "inactive"
              );
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#1597C7]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6">
        {paginatedCategories.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedCategories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onDelete={() =>
                  setDeleteCategory(category)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredCategories.length > 0 && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredCategories.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredCategories.length}
            </span>{" "}
            categories
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="min-w-24 text-center text-xs font-semibold text-slate-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
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
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <DeleteCategoryModal
        category={deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onDeleted={handleDeleteSuccess}
      />
    </>
  );
}

/* ---------------- CARD ---------------- */

function CategoryCard({
  category,
  onDelete,
}: {
  category: CategoryItem;
  onDelete: () => void;
}) {
  const createdDate = category.createdAt
    ? new Date(category.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "—";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/8">
      {/* Top */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#071A33] to-[#0D2747] px-5 py-6">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/10" />

        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full border border-white/5" />

        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10 backdrop-blur">
            <FolderTree className="h-5 w-5" />
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
              category.status === "active"
                ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/5 text-white/50"
            }`}
          >
            {category.status}
          </span>
        </div>

        <div className="relative mt-6">
          <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-white">
            {category.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
            <Hash className="h-3.5 w-3.5" />
            <span className="truncate">
              {category.slug}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="line-clamp-3 min-h-[60px] text-sm leading-6 text-slate-500">
          {category.description ||
            "No description has been added for this category yet."}
        </p>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Display Order
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800">
              #{category.displayOrder ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Created
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
              {createdDate}
            </p>
          </div>
        </div>

        {/* SEO preview */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            SEO
          </p>

          <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-700">
            {category.seoTitle || "SEO title not configured"}
          </p>

          <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">
            {category.seoDescription ||
              "SEO description not configured"}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <Link
            href={`/admin/categories/${category._id}/edit`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-4 text-xs font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Category
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${category.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- STATS ---------------- */

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

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ---------------- EMPTY ---------------- */

function EmptyState({
  search,
}: {
  search: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <FolderTree className="h-6 w-6 text-slate-400" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-[#071A33]">
        {search
          ? "No categories found"
          : "No Categories Found"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {search
          ? "Try a different category name or slug."
          : "Create your first category to organize travel packages."}
      </p>
    </div>
  );
}
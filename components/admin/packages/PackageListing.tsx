"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  FolderOpen,
  MapPin,
  Package as PackageIcon,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
} from "lucide-react";

import PageHeader from "@/components/admin/shared/PageHeader";
import DeletePackageModal from "./DeletePackageModal";

interface PopulatedRef {
  _id: string;
  name: string;
  slug: string;
}

interface PackageItem {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  destination?: PopulatedRef;
  category?: PopulatedRef;
  heroImage: string;
  gallery: string[];
  duration: string;
  difficulty: "easy" | "moderate" | "difficult";
  groupSize: string;
  originalPrice: number;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface Props {
  initialPackages: PackageItem[];
}

const ITEMS_PER_PAGE = 6;

const difficultyStyles = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
  moderate: "bg-amber-50 text-amber-700 border-amber-100",
  difficult: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function PackageListing({
  initialPackages,
}: Props) {
  const [packages, setPackages] = useState(initialPackages);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">(
    "all"
  );
  const [difficulty, setDifficulty] = useState<
    "all" | "easy" | "moderate" | "difficult"
  >("all");
  const [page, setPage] = useState(1);
  const [deletePackage, setDeletePackage] =
    useState<PackageItem | null>(null);

  const filteredPackages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return packages.filter((pkg) => {
      const matchesSearch =
        !query ||
        pkg.name.toLowerCase().includes(query) ||
        pkg.slug.toLowerCase().includes(query) ||
        pkg.destination?.name
          ?.toLowerCase()
          .includes(query) ||
        pkg.category?.name
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" || pkg.status === status;

      const matchesDifficulty =
        difficulty === "all" ||
        pkg.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDifficulty
      );
    });
  }, [packages, search, status, difficulty]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPackages.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const total = packages.length;
  const active = packages.filter(
    (pkg) => pkg.status === "active"
  ).length;
  const inactive = packages.filter(
    (pkg) => pkg.status === "inactive"
  ).length;
  const featured = packages.filter(
    (pkg) => pkg.featured
  ).length;

  function handleDeleteSuccess(id: string) {
    setPackages((current) =>
      current.filter((pkg) => pkg._id !== id)
    );
    setDeletePackage(null);
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <>
      <PageHeader
        title="Packages"
        description="Manage travel packages, pricing, itineraries and experiences."
        buttonText="Add Package"
        buttonHref="/admin/packages/new"
      />

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Packages"
          value={total}
          icon={<PackageIcon className="h-5 w-5" />}
        />

        <StatCard
          label="Active"
          value={active}
          icon={<Eye className="h-5 w-5" />}
        />

        <StatCard
          label="Inactive"
          value={inactive}
          icon={<Filter className="h-5 w-5" />}
        />

        <StatCard
          label="Featured"
          value={featured}
          icon={<Star className="h-5 w-5" />}
        />
      </div>

      {/* Toolbar */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search packages, destinations..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={status}
              onChange={(e) => {
                setStatus(
                  e.target.value as
                    | "all"
                    | "active"
                    | "inactive"
                );
                setPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#1597C7]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(
                  e.target.value as
                    | "all"
                    | "easy"
                    | "moderate"
                    | "difficult"
                );
                setPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#1597C7]"
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        {paginatedPackages.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {paginatedPackages.map((pkg) => {
              const discount =
                pkg.originalPrice > 0
                  ? Math.round(
                      ((pkg.originalPrice -
                        pkg.discountedPrice) /
                        pkg.originalPrice) *
                        100
                    )
                  : 0;

              return (
                <article
                  key={pkg._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/8"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {pkg.heroImage ? (
                      <img
                        src={pkg.heroImage}
                        alt={pkg.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PackageIcon className="h-10 w-10 text-slate-300" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          pkg.status === "active"
                            ? "border-emerald-200 bg-white/95 text-emerald-700"
                            : "border-slate-200 bg-white/95 text-slate-500"
                        }`}
                      >
                        {pkg.status}
                      </span>

                      {pkg.featured && (
                        <span className="rounded-full bg-[#F59E0B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {discount > 0 && (
                      <span className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#F06A5B] shadow-sm">
                        {discount}% OFF
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="mb-1 text-xs font-medium text-white/75">
                        {pkg.destination?.name ||
                          "Himachal Pradesh"}
                      </p>

                      <h2 className="line-clamp-1 text-xl font-semibold tracking-tight">
                        {pkg.name}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {pkg.duration || "Flexible"}
                      </span>

                      <span className="text-slate-300">•</span>

                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {pkg.groupSize || "Custom"}
                      </span>

                      {pkg.difficulty && (
                        <>
                          <span className="text-slate-300">
                            •
                          </span>

                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
                              difficultyStyles[
                                pkg.difficulty
                              ]
                            }`}
                          >
                            {pkg.difficulty}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="mt-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
                      {pkg.shortDescription ||
                        "No package description added yet."}
                    </p>

                    {/* Price */}
                    <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Starting from
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-lg font-bold text-[#071A33]">
                            {formatPrice(
                              pkg.discountedPrice
                            )}
                          </span>

                          {pkg.originalPrice >
                            pkg.discountedPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(
                                pkg.originalPrice
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <FolderOpen className="h-3.5 w-3.5" />
                        {pkg.gallery?.length || 0} photos
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-2">
                      <Link
                        href={`/admin/packages/${pkg._id}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-4 text-xs font-semibold text-white transition hover:bg-[#0D2747]"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href={`/admin/packages/${pkg._id}/edit`}
                        aria-label={`Edit ${pkg.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-[#1597C7]/30 hover:bg-[#1597C7]/5 hover:text-[#1597C7]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        aria-label={`Delete ${pkg.name}`}
                        onClick={() =>
                          setDeletePackage(pkg)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPackages.length > 0 && (
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
                filteredPackages.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredPackages.length}
            </span>{" "}
            packages
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

            <span className="min-w-20 text-center text-xs font-semibold text-slate-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1)
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <DeletePackageModal
        packageItem={deletePackage}
        onClose={() => setDeletePackage(null)}
        onDeleted={handleDeleteSuccess}
      />
    </>
  );
}

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

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <PackageIcon className="h-6 w-6 text-slate-400" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-[#071A33]">
        {search
          ? "No packages match your search"
          : "No Packages Found"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? "Try a different package name, destination or category."
          : "Create your first travel package to start building your collection."}
      </p>

      {!search && (
        <Link
          href="/admin/packages/new"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#071A33] px-4 text-xs font-semibold text-white transition hover:bg-[#0D2747]"
        >
          <Plus className="h-4 w-4" />
          Add Package
        </Link>
      )}
    </div>
  );
}
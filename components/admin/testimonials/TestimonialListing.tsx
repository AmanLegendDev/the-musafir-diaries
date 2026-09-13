"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Edit3,
  Eye,
  Loader2,
  MessageSquareQuote,
  Search,
  Star,
  Trash2,
  X,
  MapPin,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  location?: string;
  image: string;
  rating: number;
  review: string;
  trip?: string;
  featured: boolean;
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type FilterStatus = "all" | "active" | "inactive";
type FilterFeatured = "all" | "featured";

export default function TestimonialListing() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [featured, setFeatured] = useState<FilterFeatured>("all");

  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/testimonials", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch testimonials."
        );
      }

      setTestimonials(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch testimonials."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const stats = useMemo(() => {
    return {
      total: testimonials.length,
      active: testimonials.filter((item) => item.active).length,
      featured: testimonials.filter((item) => item.featured).length,
      inactive: testimonials.filter((item) => !item.active).length,
    };
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();

    return testimonials
      .filter((item) => {
        if (status === "active" && !item.active) return false;
        if (status === "inactive" && item.active) return false;

        if (featured === "featured" && !item.featured) return false;

        if (!query) return true;

        return [
          item.name,
          item.designation,
          item.location,
          item.trip,
          item.review,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        if (a.order !== b.order) {
          return a.order - b.order;
        }

        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      });
  }, [testimonials, search, status, featured]);

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `/api/testimonials/${deleteTarget._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete testimonial."
        );
      }

      setTestimonials((prev) =>
        prev.filter((item) => item._id !== deleteTarget._id)
      );

      if (selected?._id === deleteTarget._id) {
        setSelected(null);
      }

      setDeleteTarget(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete testimonial."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Social Proof
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Testimonials
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage guest reviews and customer experiences showcased across
            The Musafir Diaries.
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D2747] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#071A33]"
        >
          <span className="text-lg leading-none">+</span>
          Add Testimonial
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="rounded-lg p-1 transition hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total"
          value={stats.total}
          icon={<MessageSquareQuote className="h-5 w-5" />}
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={<Check className="h-5 w-5" />}
        />

        <StatCard
          label="Featured"
          value={stats.featured}
          icon={<Sparkles className="h-5 w-5" />}
        />

        <StatCard
          label="Inactive"
          value={stats.inactive}
          icon={<X className="h-5 w-5" />}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, trip, location or review..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as FilterStatus)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#1597C7]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={featured}
              onChange={(e) =>
                setFeatured(e.target.value as FilterFeatured)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-[#1597C7]"
            >
              <option value="all">All Testimonials</option>
              <option value="featured">Featured Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading testimonials...
          </div>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <MessageSquareQuote className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {testimonials.length === 0
              ? "No Testimonials Found"
              : "No Matching Testimonials"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {testimonials.length === 0
              ? "Add your first genuine customer testimonial to start building social proof."
              : "Try changing your search or filters to find the testimonial you need."}
          </p>

          {testimonials.length === 0 && (
            <Link
              href="/admin/testimonials/new"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#0D2747] px-5 text-sm font-bold text-white"
            >
              Add First Testimonial
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              onView={() => setSelected(testimonial)}
              onDelete={() => setDeleteTarget(testimonial)}
            />
          ))}
        </div>
      )}

      {/* View Modal */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-0 top-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087E8B]">
                Customer Testimonial
              </p>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-slate-100"
                />

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selected.name}
                  </h2>

                  {selected.designation && (
                    <p className="mt-1 text-sm text-slate-500">
                      {selected.designation}
                    </p>
                  )}

                  {selected.location && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {selected.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex gap-1 text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= selected.rating ? "fill-current" : "opacity-20"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                “{selected.review}”
              </blockquote>

              {selected.trip && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">
                  <BriefcaseBusiness className="h-4 w-4 text-[#087E8B]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Trip / Package
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selected.trip}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge
                  active={selected.active}
                  activeLabel="Active"
                  inactiveLabel="Inactive"
                />

                {selected.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/10 px-3 py-1.5 text-xs font-bold text-[#B77900]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <Modal onClose={() => !deleting && setDeleteTarget(null)}>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Delete Testimonial?
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This will permanently remove the testimonial from the CMS.
              This action cannot be undone.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              {deleteTarget.name}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {deleting ? "Deleting..." : "Delete Testimonial"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

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
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  onView,
  onDelete,
}: {
  testimonial: Testimonial;
  onView: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Customer */}
        <div className="flex min-w-0 items-center gap-4 lg:w-[280px]">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-slate-50"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-bold text-slate-900">
                {testimonial.name}
              </h2>

              {testimonial.featured && (
                <Sparkles className="h-4 w-4 shrink-0 text-[#F59E0B]" />
              )}
            </div>

            {testimonial.designation && (
              <p className="mt-1 truncate text-xs text-slate-500">
                {testimonial.designation}
              </p>
            )}

            {testimonial.location && (
              <div className="mt-1 flex items-center gap-1 truncate text-xs text-slate-400">
                <MapPin className="h-3 w-3 shrink-0" />
                {testimonial.location}
              </div>
            )}
          </div>
        </div>

        {/* Review */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-[#F59E0B]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= testimonial.rating
                      ? "fill-current"
                      : "opacity-20"
                  }`}
                />
              ))}
            </div>

            {testimonial.trip && (
              <span className="truncate text-xs font-semibold text-slate-400">
                {testimonial.trip}
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            “{testimonial.review}”
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-wrap items-center gap-2 lg:w-[150px] lg:justify-center">
          <Badge
            active={testimonial.active}
            activeLabel="Active"
            inactiveLabel="Inactive"
          />

          {testimonial.featured && (
            <span className="rounded-full bg-[#F59E0B]/10 px-2.5 py-1 text-[11px] font-bold text-[#B77900]">
              Featured
            </span>
          )}
        </div>

        {/* Order */}
        <div className="hidden text-center lg:block lg:w-[55px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Order
          </p>
          <p className="mt-1 text-sm font-bold text-slate-700">
            {testimonial.order}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 lg:w-[150px] lg:border-l lg:border-t-0 lg:justify-end lg:pl-5 lg:pt-0">
          <button
            type="button"
            onClick={onView}
            title="View testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            <Eye className="h-4 w-4" />
          </button>

          <Link
            href={`/admin/testimonials/${testimonial._id}/edit`}
            title="Edit testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#1597C7]/30 hover:bg-[#1597C7]/5 hover:text-[#087E8B]"
          >
            <Edit3 className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={onDelete}
            title="Delete testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function Badge({
  active,
  activeLabel,
  inactiveLabel,
}: {
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {activeLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      {inactiveLabel}
    </span>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
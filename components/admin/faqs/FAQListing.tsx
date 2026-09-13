"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  FileQuestion,
  Filter,
  Globe2,
  MapPin,
  Package,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Hotel,
  X,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { toast } from "sonner";

type FAQStatus = "active" | "draft";

type FAQItem = {
  _id: string;
  question: string;
  answer: string;
  destination?: {
    _id: string;
    name: string;
    slug?: string;
  } | string | null;
  package?: {
    _id: string;
    name: string;
    slug?: string;
  } | string | null;
  hotel?: {
    _id: string;
    name: string;
    slug?: string;
  } | string | null;
  category?: string;
  featured: boolean;
  displayOrder: number;
  status: FAQStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Scope = "all" | "global" | "destination" | "package" | "hotel";

function getRelationName(
  value:
    | {
        _id: string;
        name: string;
      }
    | string
    | null
    | undefined,
) {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.name;
}

function getScope(faq: FAQItem): Exclude<Scope, "all"> {
  if (faq.destination) return "destination";
  if (faq.package) return "package";
  if (faq.hotel) return "hotel";
  return "global";
}

function getScopeLabel(scope: Exclude<Scope, "all">) {
  switch (scope) {
    case "destination":
      return "Destination";
    case "package":
      return "Package";
    case "hotel":
      return "Hotel";
    default:
      return "Global";
  }
}

function ScopeIcon({ scope }: { scope: Exclude<Scope, "all"> }) {
  if (scope === "destination") {
    return <MapPin className="h-4 w-4" />;
  }

  if (scope === "package") {
    return <Package className="h-4 w-4" />;
  }

  if (scope === "hotel") {
    return <Hotel className="h-4 w-4" />;
  }

  return <Globe2 className="h-4 w-4" />;
}

export default function FAQListing() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [status, setStatus] = useState<"all" | FAQStatus>("all");
  const [featured, setFeatured] = useState<"all" | "true">("all");

  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function loadFAQs() {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (status !== "all") {
        params.set("status", status);
      }

      if (featured === "true") {
        params.set("featured", "true");
      }

      const query = params.toString();

      const response = await fetch(
        `/api/faqs${query ? `?${query}` : ""}`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load FAQs.",
        );
      }

      setFaqs(
        Array.isArray(data.faqs)
          ? data.faqs
          : [],
      );
    } catch (error) {
      console.error("FAQ_LIST_ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load FAQs.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFAQs();
  }, [status, featured]);

  const filteredFAQs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const faqScope = getScope(faq);

      const matchesScope =
        scope === "all" || faqScope === scope;

      if (!matchesScope) return false;

      if (!term) return true;

      const relation =
        getRelationName(faq.destination) ||
        getRelationName(faq.package) ||
        getRelationName(faq.hotel) ||
        "";

      return [
        faq.question,
        faq.answer,
        faq.category || "",
        relation,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [faqs, search, scope]);

  const stats = useMemo(() => {
    return {
      total: faqs.length,
      active: faqs.filter(
        (faq) => faq.status === "active",
      ).length,
      draft: faqs.filter(
        (faq) => faq.status === "draft",
      ).length,
      featured: faqs.filter(
        (faq) => faq.featured,
      ).length,
    };
  }, [faqs]);

  async function handleDelete() {
    if (!deleteTarget || deleting) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/faqs/${deleteTarget._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to delete FAQ.",
        );
      }

      setFaqs((current) =>
        current.filter(
          (faq) =>
            faq._id !== deleteTarget._id,
        ),
      );

      setDeleteTarget(null);
      setSelectedFAQ(null);

      toast.success("FAQ deleted successfully.");
    } catch (error) {
      console.error("FAQ_DELETE_ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete FAQ.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <FileQuestion className="h-4 w-4" />
            Content Management
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#071A33] sm:text-4xl">
            FAQs
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage frequently asked questions across
            destinations, packages, hotels and the
            wider Musafir Diaries experience.
          </p>
        </div>

        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071A33] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D2747]"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </Link>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total FAQs"
          value={stats.total}
          icon={FileQuestion}
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={CheckCircle2}
        />

        <StatCard
          label="Draft"
          value={stats.draft}
          icon={Clock3}
        />

        <StatCard
          label="Featured"
          value={stats.featured}
          icon={Star}
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search questions, answers, categories..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087E8B] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={scope}
                onChange={(event) =>
                  setScope(
                    event.target.value as Scope,
                  )
                }
                className="h-11 min-w-[170px] appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm outline-none focus:border-[#087E8B]"
              >
                <option value="all">
                  All scopes
                </option>
                <option value="global">
                  Global
                </option>
                <option value="destination">
                  Destination
                </option>
                <option value="package">
                  Package
                </option>
                <option value="hotel">
                  Hotel
                </option>
              </select>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "all"
                    | FAQStatus,
                )
              }
              className="h-11 min-w-[140px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#087E8B]"
            >
              <option value="all">
                All status
              </option>
              <option value="active">
                Active
              </option>
              <option value="draft">
                Draft
              </option>
            </select>

            <select
              value={featured}
              onChange={(event) =>
                setFeatured(
                  event.target.value as
                    | "all"
                    | "true",
                )
              }
              className="h-11 min-w-[140px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#087E8B]"
            >
              <option value="all">
                All FAQs
              </option>
              <option value="true">
                Featured
              </option>
            </select>
          </div>
        </div>

        {(search ||
          scope !== "all" ||
          status !== "all" ||
          featured !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setScope("all");
              setStatus("all");
              setFeatured("all");
            }}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#071A33]"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* LIST */}
      {loading ? (
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ),
          )}
        </div>
      ) : filteredFAQs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FileQuestion className="h-6 w-6 text-slate-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-[#071A33]">
            No FAQs found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {search ||
            scope !== "all" ||
            status !== "all" ||
            featured !== "all"
              ? "Try changing your filters or search term."
              : "Create your first FAQ to start building the knowledge base."}
          </p>

          {!search &&
            scope === "all" &&
            status === "all" &&
            featured === "all" && (
              <Link
                href="/admin/faqs/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#071A33] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Create FAQ
              </Link>
            )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const faqScope = getScope(faq);

            const relation =
              getRelationName(faq.destination) ||
              getRelationName(faq.package) ||
              getRelationName(faq.hotel);

            return (
              <article
                key={faq._id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        <ScopeIcon scope={faqScope} />
                        {getScopeLabel(faqScope)}
                      </span>

                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          faq.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700",
                        ].join(" ")}
                      >
                        {faq.status}
                      </span>

                      {faq.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 max-w-4xl text-lg font-semibold leading-7 text-[#071A33]">
                      {faq.question}
                    </h2>

                    <p className="mt-2 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-500">
                      {faq.answer}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                      {relation && (
                        <span>
                          <span className="font-medium text-slate-500">
                            Related:
                          </span>{" "}
                          {relation}
                        </span>
                      )}

                      {faq.category && (
                        <span>
                          <span className="font-medium text-slate-500">
                            Category:
                          </span>{" "}
                          {faq.category}
                        </span>
                      )}

                      <span>
                        <span className="font-medium text-slate-500">
                          Order:
                        </span>{" "}
                        {faq.displayOrder}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 lg:pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFAQ(faq)
                      }
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#071A33]"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        View
                      </span>
                    </button>

                    <Link
                      href={`/admin/faqs/${faq._id}/edit`}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#071A33]"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        Edit
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget(faq)
                      }
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-red-100 px-3 text-red-500 transition hover:bg-red-50"
                      aria-label="Delete FAQ"
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

      {/* VIEW MODAL */}
      {selectedFAQ && (
        <Modal
          title="FAQ Preview"
          onClose={() => setSelectedFAQ(null)}
        >
          {(() => {
            const faqScope =
              getScope(selectedFAQ);

            const relation =
              getRelationName(
                selectedFAQ.destination,
              ) ||
              getRelationName(
                selectedFAQ.package,
              ) ||
              getRelationName(
                selectedFAQ.hotel,
              );

            return (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    <ScopeIcon scope={faqScope} />
                    {getScopeLabel(faqScope)}
                  </span>

                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
                      selectedFAQ.status ===
                      "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700",
                    ].join(" ")}
                  >
                    {selectedFAQ.status}
                  </span>

                  {selectedFAQ.featured && (
                    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Question
                  </p>

                  <h3 className="mt-2 text-xl font-semibold leading-8 text-[#071A33]">
                    {selectedFAQ.question}
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Answer
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {selectedFAQ.answer}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Info label="Related" value={relation || "Global"} />
                  <Info
                    label="Category"
                    value={
                      selectedFAQ.category ||
                      "Uncategorised"
                    }
                  />
                  <Info
                    label="Display Order"
                    value={String(
                      selectedFAQ.displayOrder,
                    )}
                  />
                  <Info
                    label="Featured"
                    value={
                      selectedFAQ.featured
                        ? "Yes"
                        : "No"
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedFAQ(null)
                    }
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600"
                  >
                    Close
                  </button>

                  <Link
                    href={`/admin/faqs/${selectedFAQ._id}/edit`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#071A33] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit FAQ
                  </Link>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <Modal
          title="Delete FAQ?"
          onClose={() =>
            deleting || setDeleteTarget(null)
          }
        >
          <div className="space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>

            <div>
              <p className="text-sm leading-6 text-slate-500">
                You are about to permanently delete:
              </p>

              <p className="mt-2 font-semibold leading-6 text-[#071A33]">
                {deleteTarget.question}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
              This action cannot be undone.
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                {deleting
                  ? "Deleting..."
                  : "Delete FAQ"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#071A33]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50">
          <Icon className="h-5 w-5 text-[#087E8B]" />
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#071A33]">
        {value}
      </p>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071A33]/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
          <h2 className="text-lg font-semibold text-[#071A33]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
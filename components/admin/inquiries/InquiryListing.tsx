"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  ClipboardList,
  RefreshCw,
  Search,
} from "lucide-react";

import InquiryCard from "./InquiryCard";
import InquiryStatusTabs from "./InquiryStatusTabs";

import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

interface DestinationData {
  _id: string;
  name: string;
  slug?: string;
  city?: string;
  state?: string;
}

export interface InquiryData {
  _id: string;
  inquiryNumber: string;
  fullName: string;
  phone: string;
  email: string;
  destination?:
    | DestinationData
    | null;
  travelDate: string;
  travelers: number;
  budget?: string;
  pickupLocation?: string;
  message: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Stats {
  total: number;
  pending: number;
  contacted: number;
  quoted: number;
  confirmed: number;
  cancelled: number;
}

interface Props {
  initialStatus?: string;
  initialSearch?: string;
}

const EMPTY_STATS: Stats = {
  total: 0,
  pending: 0,
  contacted: 0,
  quoted: 0,
  confirmed: 0,
  cancelled: 0,
};

function StatCard({
  label,
  value,
  description,
  className = "",
}: {
  label: string;
  value: number;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-3xl font-extrabold tracking-tight text-[#071A33]">
          {value}
        </span>

        <span className="pb-1 text-[10px] font-semibold text-slate-400">
          {description}
        </span>
      </div>
    </div>
  );
}

export default function InquiryListing({
  initialStatus = "",
  initialSearch = "",
}: Props) {
  const [inquiries, setInquiries] =
    useState<InquiryData[]>([]);

  const [stats, setStats] =
    useState<Stats>(EMPTY_STATS);

  const [searchInput, setSearchInput] =
    useState(initialSearch);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadInquiries = useCallback(
  async (
    status = initialStatus,
    search = initialSearch,
  ) => {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();

    try {
      const response = await fetch(
        `/api/inquiries${query ? `?${query}` : ""}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to load inquiries.",
        );
      }

      setInquiries(
        Array.isArray(result?.data)
          ? result.data
          : [],
      );

      setStats(
        result?.stats ?? EMPTY_STATS,
      );

      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load inquiries.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  },
  [initialStatus, initialSearch],
);

  /*
   * Initial load / server URL state.
   */
useEffect(() => {
  let cancelled = false;

  const run = async () => {
    if (cancelled) return;

    setLoading(true);

    await loadInquiries(
      initialStatus,
      initialSearch,
    );
  };

  void run();

  return () => {
    cancelled = true;
  };
}, [
  initialStatus,
  initialSearch,
  loadInquiries,
]);
  /*
   * Debounced search.
   *
   * Search is reflected in the URL so:
   * - refresh preserves search
   * - browser back/forward works
   * - links can be shared
   */
 useEffect(() => {
  const timer = window.setTimeout(() => {
    const normalized = searchInput.trim();

    if (normalized === initialSearch) {
      return;
    }

    const params = new URLSearchParams();

    if (initialStatus) {
      params.set("status", initialStatus);
    }

    if (normalized) {
      params.set("search", normalized);
    }

    const nextUrl = `/admin/inquiries${
      params.toString()
        ? `?${params.toString()}`
        : ""
    }`;

    window.history.replaceState(
      null,
      "",
      nextUrl,
    );

    void loadInquiries(
      initialStatus,
      normalized,
    );
  }, 350);

  return () =>
    window.clearTimeout(timer);
}, [
  searchInput,
  initialStatus,
  initialSearch,
  loadInquiries,
]);

  const handleRefresh =
    async () => {
      await loadInquiries(
        initialStatus,
        searchInput.trim(),
      );
    };

  const handleStatusChanged =
    async () => {
      /*
       * Never manually mutate statistics here.
       *
       * The API is the source of truth and
       * recalculating from the server prevents
       * count drift after status transitions.
       */
      await loadInquiries(
        initialStatus,
        searchInput.trim(),
      );
    };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
              Business
            </p>
          </div>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#071A33] sm:text-3xl">
            Inquiries
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage customer travel enquiries,
            follow-ups, quotations and
            confirmations from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={
            loading || refreshing
          }
          className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Stats                                                             */}
      {/* ---------------------------------------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total"
          value={stats.total}
          description="All enquiries"
        />

        <StatCard
          label="Pending"
          value={stats.pending}
          description="Need action"
        />

        <StatCard
          label="Contacted"
          value={stats.contacted}
          description="In conversation"
        />

        <StatCard
          label="Quoted"
          value={stats.quoted}
          description="Quotation sent"
        />

        <StatCard
          label="Confirmed"
          value={stats.confirmed}
          description="Ready"
        />
      </div>

      {/* Cancelled secondary stat */}

      {stats.cancelled > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3">
          <span className="text-xs font-semibold text-red-700">
            Cancelled inquiries
          </span>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-red-600 shadow-sm">
            {stats.cancelled}
          </span>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Search                                                            */}
      {/* ---------------------------------------------------------------- */}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={searchInput}
            onChange={(event) =>
              setSearchInput(
                event.target.value,
              )
            }
            placeholder="Search name, phone, email, inquiry number or destination..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#087E8B] focus:bg-white focus:ring-4 focus:ring-[#087E8B]/10"
          />
        </div>

        {searchInput && (
          <button
            type="button"
            onClick={() =>
              setSearchInput("")
            }
            className="h-11 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Clear
          </button>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Status Tabs                                                       */}
      {/* ---------------------------------------------------------------- */}

      <InquiryStatusTabs
        counts={stats}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Error                                                             */}
      {/* ---------------------------------------------------------------- */}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div className="min-w-0">
            <p className="text-sm font-bold text-red-800">
              Unable to load inquiries
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="ml-auto shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Loading                                                           */}
      {/* ---------------------------------------------------------------- */}

      {loading && (
        <div className="space-y-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Empty                                                             */}
      {/* ---------------------------------------------------------------- */}

      {!loading &&
        !error &&
        inquiries.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-[#071A33]">
              {searchInput.trim()
                ? "No matching inquiries"
                : initialStatus
                  ? "No inquiries in this status"
                  : "No inquiries yet"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {searchInput.trim()
                ? "Try a different customer name, phone number, email, inquiry number or destination."
                : initialStatus
                  ? "There are currently no inquiries matching this status."
                  : "Customer enquiries submitted through the website will appear here."}
            </p>

            {(searchInput ||
              initialStatus) && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");

                  window.history.replaceState(
                    null,
                    "",
                    "/admin/inquiries",
                  );

                  loadInquiries(
                    "",
                    "",
                  );
                }}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[#071A33] px-4 text-xs font-bold text-white transition hover:bg-[#0D2747]"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

      {/* ---------------------------------------------------------------- */}
      {/* Cards                                                             */}
      {/* ---------------------------------------------------------------- */}

      {!loading &&
        !error &&
        inquiries.length > 0 && (
          <div className="space-y-4">
            {inquiries.map(
              (inquiry) => (
                <InquiryCard
                  key={inquiry._id}
                  inquiry={inquiry}
                  onStatusChanged={
                    handleStatusChanged
                  }
                />
              ),
            )}
          </div>
        )}
    </div>
  );
}
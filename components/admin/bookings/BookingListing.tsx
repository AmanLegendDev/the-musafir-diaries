"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Loader2,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";

import BookingCard, {
  type BookingData,
} from "./BookingCard";

import BookingStatusTabs, {
  type BookingFilter,
} from "./BookingStatusTabs";

export default function BookingListing() {
  const [bookings, setBookings] = useState<
    BookingData[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<BookingFilter>("all");

  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to fetch bookings.",
        );
      }

      setBookings(
        Array.isArray(result?.data)
          ? result.data
          : [],
      );

      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch bookings.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBookings();
  }, []);

  const counts = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(
        (item) =>
          item.bookingStatus === "pending"
      ).length,
      confirmed: bookings.filter(
        (item) =>
          item.bookingStatus === "confirmed"
      ).length,
      cancelled: bookings.filter(
        (item) =>
          item.bookingStatus === "cancelled"
      ).length,
      completed: bookings.filter(
        (item) =>
          item.bookingStatus === "completed"
      ).length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return bookings.filter((booking) => {
      if (
        status !== "all" &&
        booking.bookingStatus !== status
      ) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        booking.bookingNumber,
        booking.customerName,
        booking.phone,
        booking.email,
        booking.packageSnapshot?.name,
        booking.pickupLocation,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        );
    });
  }, [bookings, search, status]);

  const handleStatusChanged = (
    bookingId: string,
    nextStatus: BookingData["bookingStatus"]
  ) => {
    setBookings((current) =>
      current.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              bookingStatus: nextStatus,
            }
          : booking
      )
    );
  };

  return (
    <div className="space-y-7">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
            <CalendarCheck className="h-3.5 w-3.5" />
            Booking Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Bookings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review customer bookings, manage their
            journey status and keep every reservation
            organised.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Stats                                                             */}
      {/* ---------------------------------------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Bookings"
          value={counts.total}
          icon={
            <CalendarCheck className="h-5 w-5" />
          }
        />

        <StatCard
          label="Pending"
          value={counts.pending}
          icon={
            <Clock3 className="h-5 w-5" />
          }
          highlight="amber"
        />

        <StatCard
          label="Confirmed"
          value={counts.confirmed}
          icon={
            <CheckCircle2 className="h-5 w-5" />
          }
          highlight="green"
        />

        <StatCard
          label="Cancelled"
          value={counts.cancelled}
          icon={
            <XCircle className="h-5 w-5" />
          }
          highlight="red"
        />

        <StatCard
          label="Completed"
          value={counts.completed}
          icon={
            <Sparkles className="h-5 w-5" />
          }
          highlight="blue"
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Search + Status                                                   */}
      {/* ---------------------------------------------------------------- */}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search booking number, customer, phone, email or package..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
            />
          </div>

          <BookingStatusTabs
            value={status}
            onChange={setStatus}
            counts={counts}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Error                                                             */}
      {/* ---------------------------------------------------------------- */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-bold">
            Unable to load bookings
          </p>

          <p className="mt-1">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void fetchBookings();
            }}
            className="mt-3 font-bold underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Loading                                                           */}
      {/* ---------------------------------------------------------------- */}

      {loading ? (
        <div className="flex min-h-[380px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071A33]/5 text-[#071A33]">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Loading bookings
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Fetching the latest reservations...
              </p>
            </div>
          </div>
        </div>
      ) : filteredBookings.length === 0 ? (
        /* ---------------------------------------------------------------- */
        /* Empty                                                             */
        /* ---------------------------------------------------------------- */

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <CalendarCheck className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {bookings.length === 0
              ? "No Bookings Yet"
              : "No Matching Bookings"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {bookings.length === 0
              ? "Customer bookings will appear here once someone submits a booking request."
              : "Try changing the search term or selecting a different booking status."}
          </p>
        </div>
      ) : (
        /* ---------------------------------------------------------------- */
        /* Cards                                                             */
        /* ---------------------------------------------------------------- */

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-semibold text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-600">
                {filteredBookings.length}
              </span>{" "}
              {filteredBookings.length === 1
                ? "booking"
                : "bookings"}
            </p>
          </div>

          {filteredBookings.map(
            (booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onStatusChanged={
                  handleStatusChanged
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  icon,
  highlight = "navy",
}: {
  label: string;
  value: number;
  icon: ReactNode;
  highlight?: "navy" | "amber" | "green" | "red" | "blue";
}) {
  const iconStyles = {
    navy: "bg-[#071A33]/5 text-[#071A33]",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-sky-50 text-sky-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[highlight]}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-extrabold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
    </div>
  );
}
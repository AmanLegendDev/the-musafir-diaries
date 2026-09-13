import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Package,
  Users,
} from "lucide-react";

import BookingStatusBadge from "@/components/admin/bookings/BookingStatusBadge";

import type {
  DashboardBooking,
} from "@/lib/dashboard/dashboard-data";

interface Props {
  bookings: DashboardBooking[];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function formatCurrency(value: number) {
  if (!value || value <= 0) {
    return "—";
  }

  return `₹${value.toLocaleString(
    "en-IN",
  )}`;
}

export default function RecentBookings({
  bookings,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.045)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1597C7]/[0.08] text-[#1597C7]">
            <Package className="h-4 w-4" />
          </span>

          <div>
            <h2 className="text-base font-bold text-[#071A33]">
              Recent bookings
            </h2>

            <p className="text-xs text-slate-400">
              Latest travel reservations
            </p>
          </div>
        </div>

        <Link
          href="/admin/bookings"
          className="group inline-flex items-center gap-1 text-xs font-bold text-[#087E8B]"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
            <Package className="h-5 w-5" />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            No bookings yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            New bookings will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <Link
              key={booking._id}
              href={`/admin/bookings/${booking._id}`}
              className="group block px-5 py-5 transition-colors hover:bg-slate-50/70 sm:px-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#071A33]">
                      {booking.customerName}
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {booking.bookingNumber}
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#087E8B]" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">
                      {booking.packageSnapshot?.name ??
                        booking.package?.name ??
                        "Package unavailable"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(
                          booking.travelDate,
                        )}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {booking.adults +
                          booking.children}{" "}
                        travellers
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="inline-flex items-center gap-1 text-sm font-extrabold text-[#071A33]">
                      <CircleDollarSign className="h-3.5 w-3.5 text-[#087E8B]" />
                      {formatCurrency(
                        booking.total,
                      )}
                    </p>

                    <div className="mt-2">
                      <BookingStatusBadge
                        status={
                          booking.bookingStatus
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
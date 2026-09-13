"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Users,
  X,
  XCircle,
} from "lucide-react";

import BookingStatusBadge, {
  type BookingStatus,
} from "./BookingStatusBadge";

export interface BookingData {
  _id: string;
  bookingNumber: string;

  package?: {
    _id: string;
    name: string;
    slug: string;
    duration: string;
    discountedPrice?: number;
    originalPrice?: number;
    status?: string;
  } | null;

  packageSnapshot?: {
    name?: string;
    slug?: string;
    duration?: string;
    originalPrice?: number;
    discountedPrice?: number;
  } | null;

  customerName: string;
  phone: string;
  email: string;
  travelDate: string;

  adults: number;
  children: number;
  childrenAges: number[];

  pickupLocation: string;
  specialRequest?: string;

  pricing?: {
    adultTotal?: number;
    childTotal?: number;
    subtotal?: number;
    total?: number;
  } | null;

  paymentStatus:
    | "pending"
    | "advance_paid"
    | "paid"
    | "refunded";

  bookingStatus: BookingStatus;

  createdAt?: string;
  updatedAt?: string;
}

interface BookingCardProps {
  booking: BookingData;
  onStatusChanged: (
    bookingId: string,
    status: BookingStatus
  ) => void;
}

type ActionType = "confirm" | "cancel" | "complete";

const ACTION_CONFIG: Record<
  ActionType,
  {
    title: string;
    description: string;
    confirmText: string;
    icon: typeof CheckCircle2;
    buttonClass: string;
  }
> = {
  confirm: {
    title: "Confirm this booking?",
    description:
      "This booking will be moved from Pending to Confirmed. Make sure the customer and travel details have been reviewed.",
    confirmText: "Confirm Booking",
    icon: CheckCircle2,
    buttonClass:
      "bg-emerald-600 hover:bg-emerald-700",
  },

  cancel: {
    title: "Cancel this booking?",
    description:
      "This booking will be moved to Cancelled. A cancelled booking cannot be moved back to Pending or Confirmed.",
    confirmText: "Cancel Booking",
    icon: XCircle,
    buttonClass:
      "bg-red-600 hover:bg-red-700",
  },

  complete: {
    title: "Complete this booking?",
    description:
      "This will mark the customer's journey as successfully completed.",
    confirmText: "Mark Completed",
    icon: CheckCircle2,
    buttonClass:
      "bg-[#087E8B] hover:bg-[#066b75]",
  },
};

export default function BookingCard({
  booking,
  onStatusChanged,
}: BookingCardProps) {
  const [action, setAction] =
    useState<ActionType | null>(null);

  const [updating, setUpdating] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* Safe normalized values                                                     */
  /* -------------------------------------------------------------------------- */

  const packageName =
    booking.packageSnapshot?.name ??
    booking.package?.name ??
    "Package unavailable";

  const packageDuration =
    booking.packageSnapshot?.duration ??
    booking.package?.duration ??
    "";

  const bookingTotal =
    typeof booking.pricing?.total === "number"
      ? booking.pricing.total
      : 0;

  const adults =
    typeof booking.adults === "number"
      ? booking.adults
      : 0;

  const children =
    typeof booking.children === "number"
      ? booking.children
      : 0;

  const guestCount = adults + children;

  const paymentStatus =
    booking.paymentStatus ?? "pending";

  /* -------------------------------------------------------------------------- */
  /* Helpers                                                                    */
  /* -------------------------------------------------------------------------- */

  const formatDate = (value?: string) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const paymentLabel = paymentStatus.replace(
    "_",
    " "
  );

  /* -------------------------------------------------------------------------- */
  /* Booking status action                                                      */
  /* -------------------------------------------------------------------------- */

  const handleAction = async () => {
    if (!action) return;

    const nextStatus: BookingStatus =
      action === "confirm"
        ? "confirmed"
        : action === "cancel"
          ? "cancelled"
          : "completed";

    try {
      setUpdating(true);

      const response = await fetch(
        `/api/bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus: nextStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update booking."
        );
      }

      onStatusChanged(
        booking._id,
        nextStatus
      );

      setAction(null);
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to update booking."
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                              */}
        {/* ------------------------------------------------------------------ */}

        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-[#071A33]">
                  #{booking.bookingNumber || "—"}
                </span>

                <span className="text-xs text-slate-400">
                  •
                </span>

                <span className="text-xs text-slate-400">
                  {booking.createdAt
                    ? formatDate(booking.createdAt)
                    : "—"}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Booking request
              </p>
            </div>

            <BookingStatusBadge
              status={booking.bookingStatus}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Body                                                                */}
        {/* ------------------------------------------------------------------ */}

        <div className="p-5 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_180px]">
            {/* Customer */}

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Customer
              </p>

              <h2 className="mt-2 truncate text-lg font-bold text-slate-900">
                {booking.customerName || "Unnamed customer"}
              </h2>

              <div className="mt-2 space-y-1.5">
                {booking.phone ? (
                  <a
                    href={`tel:${booking.phone}`}
                    className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-[#087E8B]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {booking.phone}
                  </a>
                ) : (
                  <p className="text-xs text-slate-400">
                    No phone number
                  </p>
                )}

                <p className="truncate text-xs text-slate-500">
                  {booking.email || "No email"}
                </p>
              </div>
            </div>

            {/* Journey */}

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Journey
              </p>

              <h3 className="mt-2 truncate text-sm font-bold text-slate-900">
                {packageName}
              </h3>

              {packageDuration && (
                <p className="mt-1 truncate text-[11px] text-slate-400">
                  {packageDuration}
                </p>
              )}

              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-[#087E8B]" />

                  {formatDate(booking.travelDate)}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users className="h-3.5 w-3.5 text-[#087E8B]" />

                  {guestCount}{" "}
                  {guestCount === 1
                    ? "traveller"
                    : "travellers"}

                  <span className="text-slate-300">
                    •
                  </span>

                  {adults} adults

                  {children > 0 &&
                    ` • ${children} children`}
                </div>

                {booking.pickupLocation && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-[#087E8B]" />

                    <span className="truncate">
                      {booking.pickupLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}

            <div className="rounded-xl bg-slate-50 p-4 xl:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Booking Total
              </p>

              <div className="mt-2 flex items-center gap-1 text-xl font-extrabold text-[#071A33] xl:justify-end">
                <IndianRupee className="h-4 w-4" />

                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(bookingTotal)}
              </div>

              <p className="mt-1 text-[11px] capitalize text-slate-400">
                Payment: {paymentLabel}
              </p>

              {!booking.pricing && (
                <p className="mt-2 text-[10px] font-medium text-amber-600">
                  Pricing unavailable
                </p>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Actions                                                           */}
          {/* ---------------------------------------------------------------- */}

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/admin/bookings/${booking._id}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Details

              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {booking.bookingStatus ===
              "pending" && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setAction("cancel")
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-bold text-red-600 transition hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAction("confirm")
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm
                </button>
              </div>
            )}

            {booking.bookingStatus ===
              "confirmed" && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setAction("cancel")
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-bold text-red-600 transition hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAction("complete")
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087E8B] px-4 text-xs font-bold text-white transition hover:bg-[#066b75]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Complete
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* -------------------------------------------------------------------- */}
      {/* Confirmation Modal                                                   */}
      {/* -------------------------------------------------------------------- */}

      {action && (
        <ConfirmationModal
          action={action}
          booking={booking}
          loading={updating}
          onClose={() =>
            !updating && setAction(null)
          }
          onConfirm={handleAction}
        />
      )}
    </>
  );
}

/* ========================================================================== */
/* Confirmation Modal                                                         */
/* ========================================================================== */

function ConfirmationModal({
  action,
  booking,
  loading,
  onClose,
  onConfirm,
}: {
  action: ActionType;
  booking: BookingData;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const config = ACTION_CONFIG[action];

  const Icon = config.icon;

  const isDanger = action === "cancel";

  const packageName =
    booking.packageSnapshot?.name ??
    booking.package?.name ??
    "Package unavailable";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close confirmation"
        onClick={onClose}
        disabled={loading}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div
              className={`
                flex h-12 w-12 items-center justify-center rounded-2xl
                ${
                  isDanger
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-600"
                }
              `}
            >
              <Icon className="h-6 w-6" />
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {config.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {config.description}
          </p>

          {/* Booking Summary */}

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Booking
              </span>

              <span className="text-xs font-extrabold text-[#071A33]">
                #{booking.bookingNumber || "—"}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-sm font-bold text-slate-800">
                {booking.customerName ||
                  "Unnamed customer"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {packageName}
              </p>
            </div>
          </div>

          {/* Warning */}

          {isDanger && (
            <div className="mt-4 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

              <span>
                Please make sure you have reviewed the
                booking before cancelling it.
              </span>
            </div>
          )}

          {/* Buttons */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${config.buttonClass}`}
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading
                ? "Updating..."
                : config.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
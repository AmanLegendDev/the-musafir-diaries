"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  IndianRupee,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  ShieldCheck,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

import type { BookingData } from "./BookingCard";
import BookingStatusBadge, {
  type BookingStatus,
} from "./BookingStatusBadge";
import PaymentStatusBadge, {
  type PaymentStatus,
} from "./PaymentStatusBadge";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type BookingAction =
  | "confirm"
  | "cancel"
  | "complete";


  

type PaymentAction =
  | "advance_paid"
  | "paid"
  | "refunded";

type ActionType =
  | {
      kind: "booking";
      action: BookingAction;
    }
  | {
      kind: "payment";
      action: PaymentAction;
    };


    const BOOKING_ACTION_TO_STATUS: Record<
  BookingAction,
  BookingStatus
> = {
  confirm: "confirmed",
  cancel: "cancelled",
  complete: "completed",
};
/* -------------------------------------------------------------------------- */
/* ACTION CONFIG                                                              */
/* -------------------------------------------------------------------------- */

const BOOKING_ACTION_CONFIG: Record<
  BookingAction,
  {
    title: string;
    description: string;
    confirmText: string;
    icon: typeof CheckCircle2;
    iconClass: string;
    buttonClass: string;
  }
> = {
  confirm: {
    title: "Confirm this booking?",
    description:
      "This booking will move from Pending to Confirmed. Please make sure the customer's journey details have been reviewed before confirming.",
    confirmText: "Confirm Booking",
    icon: CheckCircle2,
    iconClass:
      "bg-emerald-50 text-emerald-600",
    buttonClass:
      "bg-emerald-600 hover:bg-emerald-700",
  },

  cancel: {
    title: "Cancel this booking?",
    description:
      "This booking will move to Cancelled. A cancelled booking cannot be moved back to Pending or Confirmed.",
    confirmText: "Cancel Booking",
    icon: XCircle,
    iconClass:
      "bg-red-50 text-red-600",
    buttonClass:
      "bg-red-600 hover:bg-red-700",
  },

  complete: {
    title: "Complete this booking?",
    description:
      "This will mark the customer's journey as successfully completed. Make sure the trip has actually been completed before continuing.",
    confirmText: "Mark Completed",
    icon: CheckCircle2,
    iconClass:
      "bg-[#087E8B]/10 text-[#087E8B]",
    buttonClass:
      "bg-[#087E8B] hover:bg-[#066b75]",
  },
};

const PAYMENT_ACTION_CONFIG: Record<
  PaymentAction,
  {
    title: string;
    description: string;
    confirmText: string;
    icon: typeof CircleDollarSign;
    iconClass: string;
    buttonClass: string;
  }
> = {
  advance_paid: {
    title: "Mark advance as paid?",
    description:
      "This will record that an advance payment has been received for this booking.",
    confirmText: "Mark Advance Paid",
    icon: CircleDollarSign,
    iconClass:
      "bg-sky-50 text-sky-600",
    buttonClass:
      "bg-sky-600 hover:bg-sky-700",
  },

  paid: {
    title: "Mark payment as fully paid?",
    description:
      "This will mark the complete booking amount as received. Continue only if the full payment has actually been received.",
    confirmText: "Mark Fully Paid",
    icon: CheckCircle2,
    iconClass:
      "bg-emerald-50 text-emerald-600",
    buttonClass:
      "bg-emerald-600 hover:bg-emerald-700",
  },

  refunded: {
    title: "Mark payment as refunded?",
    description:
      "Only continue after the actual refund has been processed. This action will update the payment record to Refunded.",
    confirmText: "Mark Refunded",
    icon: RotateCcw,
    iconClass:
      "bg-slate-100 text-slate-600",
    buttonClass:
      "bg-slate-700 hover:bg-slate-800",
  },
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function BookingDetails({
  booking: initialBooking,
}: {
  booking: BookingData;
}) {
  const [booking, setBooking] =
    useState<BookingData>(initialBooking);

  const [action, setAction] =
    useState<ActionType | null>(null);

  const [updating, setUpdating] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ------------------------------------------------------------------------ */
  /* FORMATTERS                                                               */
  /* ------------------------------------------------------------------------ */

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatDateTime = (value?: string) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };




  const packageSnapshot = booking.packageSnapshot;
  const packageName =
    packageSnapshot?.name ||
    booking.package?.name ||
    "Package unavailable";

  const packageDuration =
    packageSnapshot?.duration ||
    "Duration unavailable";

  const originalPrice =
    packageSnapshot?.originalPrice ?? 0;

  const bookingPrice =
    packageSnapshot?.discountedPrice ?? 0;

  const pricing = booking.pricing;
  const adultTotal = pricing?.adultTotal ?? 0;
  const childTotal = pricing?.childTotal ?? 0;
  const subtotal = pricing?.subtotal ?? 0;
  const bookingTotal = pricing?.total ?? 0;

  /* ------------------------------------------------------------------------ */
  /* STATUS ACTION                                                            */
  /* ------------------------------------------------------------------------ */

  const handleAction = async () => {
    if (!action) return;

    try {
      setUpdating(true);
      setError("");

     const body =
  action.kind === "booking"
    ? {
        bookingStatus:
          BOOKING_ACTION_TO_STATUS[
            action.action
          ],
      }
    : {
        paymentStatus:
          action.action,
      };

      const response = await fetch(
        `/api/bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update booking."
        );
      }

      if (result?.data) {
        setBooking(result.data);
      } else {
     setBooking((current) => {
  if (action.kind === "booking") {
    return {
      ...current,
      bookingStatus:
        BOOKING_ACTION_TO_STATUS[
          action.action
        ],
    };
  }

  return {
    ...current,
    paymentStatus: action.action,
  };
});
      }

      setAction(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update booking."
      );
    } finally {
      setUpdating(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* BOOKING ACTIONS                                                          */
  /* ------------------------------------------------------------------------ */

  const canConfirm =
    booking.bookingStatus === "pending";

  const canCancel =
    booking.bookingStatus === "pending" ||
    booking.bookingStatus === "confirmed";

  const canComplete =
    booking.bookingStatus === "confirmed";

  /* ------------------------------------------------------------------------ */
  /* PAYMENT ACTIONS                                                          */
  /* ------------------------------------------------------------------------ */

  const canMarkAdvancePaid =
    booking.paymentStatus === "pending";

  const canMarkPaid =
    booking.paymentStatus === "pending" ||
    booking.paymentStatus === "advance_paid";

  const canRefund =
    booking.paymentStatus === "advance_paid" ||
    booking.paymentStatus === "paid";

  /* ------------------------------------------------------------------------ */
  /* RETURN                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* ================================================================== */}
      {/* PAGE HEADER                                                        */}
      {/* ================================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#071A33]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Bookings
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Booking Details
            </h1>

            <BookingStatusBadge
              status={
                booking.bookingStatus
              }
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Booking #
            {booking.bookingNumber}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {canCancel && (
            <button
              type="button"
              onClick={() =>
                setAction({
                  kind: "booking",
                  action: "cancel",
                })
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              <XCircle className="h-4 w-4" />
              Cancel
            </button>
          )}

          {canConfirm && (
            <button
              type="button"
              onClick={() =>
                setAction({
                  kind: "booking",
                  action: "confirm",
                })
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Confirm
            </button>
          )}

          {canComplete && (
            <button
              type="button"
              onClick={() =>
                setAction({
                  kind: "booking",
                  action: "complete",
                })
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#087E8B] px-4 text-xs font-bold text-white transition hover:bg-[#066b75]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete
            </button>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* ERROR                                                              */}
      {/* ================================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-bold">
              Unable to update booking
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-auto text-red-400 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ================================================================== */}
      {/* HERO SUMMARY                                                       */}
      {/* ================================================================== */}

      <section className="overflow-hidden rounded-2xl bg-[#071A33] text-white shadow-lg">
        <div className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  Reservation
                </span>

                <span className="text-white/25">
                  •
                </span>

                <span className="text-xs text-white/45">
                  Created{" "}
                  {formatDateTime(
                    booking.createdAt
                  )}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {booking.customerName}
              </h2>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/65">
                <a
                  href={`tel:${booking.phone}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {booking.phone}
                </a>

                <a
                  href={`mailto:${booking.email}`}
                  className="inline-flex min-w-0 items-center gap-2 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />

                  <span className="truncate">
                    {booking.email}
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:min-w-[220px] lg:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Booking Total
              </p>

              <div className="mt-2 flex items-center text-3xl font-extrabold lg:justify-end">
                <IndianRupee className="h-6 w-6" />

                {new Intl.NumberFormat(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                ).format(
                  bookingTotal
                )}
              </div>

              <div className="mt-3 lg:flex lg:justify-end">
                <PaymentStatusBadge
                  status={
                    booking.paymentStatus
                  }
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STATUS TIMELINE                                                    */}
      {/* ================================================================== */}

      <BookingTimeline
        status={booking.bookingStatus}
      />

      {/* ================================================================== */}
      {/* MAIN GRID                                                           */}
      {/* ================================================================== */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT                                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-6">
          {/* ============================================================ */}
          {/* CUSTOMER                                                       */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <UserRound className="h-5 w-5" />
              }
              title="Customer Information"
              description="Contact details submitted with this booking."
            />

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <InfoItem
                label="Full Name"
                value={booking.customerName}
              />

              <InfoItem
                label="Phone"
                value={booking.phone}
                href={`tel:${booking.phone}`}
                icon={
                  <Phone className="h-4 w-4" />
                }
              />

              <InfoItem
                label="Email"
                value={booking.email}
                href={`mailto:${booking.email}`}
                icon={
                  <Mail className="h-4 w-4" />
                }
              />

              <InfoItem
                label="Pickup Location"
                value={
                  booking.pickupLocation ||
                  "Not specified"
                }
                icon={
                  <MapPin className="h-4 w-4" />
                }
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* JOURNEY                                                        */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <CalendarDays className="h-5 w-5" />
              }
              title="Journey Details"
              description="Package and travel information."
            />

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <InfoItem
                label="Package"
                value={
                  packageName
                }
              />

              <InfoItem
                label="Duration"
                value={
                  packageDuration
                }
              />

              <InfoItem
                label="Travel Date"
                value={formatDate(
                  booking.travelDate
                )}
              />

              <InfoItem
                label="Pickup Location"
                value={
                  booking.pickupLocation ||
                  "Not specified"
                }
                icon={
                  <MapPin className="h-4 w-4" />
                }
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* TRAVELLERS                                                     */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <Users className="h-5 w-5" />
              }
              title="Travellers"
              description="Guest composition for this reservation."
            />

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <NumberCard
                label="Adults"
                value={booking.adults}
              />

              <NumberCard
                label="Children"
                value={booking.children}
              />

              <NumberCard
                label="Total Guests"
                value={
                  booking.adults +
                  booking.children
                }
              />
            </div>

            {booking.children > 0 && (
              <div className="border-t border-slate-100 px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Children Ages
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {booking.childrenAges.map(
                    (age, index) => (
                      <span
                        key={`${age}-${index}`}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                      >
                        Child {index + 1}:{" "}
                        {age} years
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          {/* ============================================================ */}
          {/* SPECIAL REQUEST                                               */}
          {/* ============================================================ */}

          {booking.specialRequest && (
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={
                  <MessageSquare className="h-5 w-5" />
                }
                title="Special Request"
                description="Additional information provided by the customer."
              />

              <div className="p-6">
                <div className="rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                  {booking.specialRequest}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================ */}
          {/* PRICING                                                       */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <IndianRupee className="h-5 w-5" />
              }
              title="Pricing"
              description="Server-calculated booking pricing."
            />

            <div className="p-6">
              <div className="space-y-3">
                <PriceRow
                  label="Adults"
                  value={
                    adultTotal
                  }
                />

                <PriceRow
                  label="Children"
                  value={
                    childTotal
                  }
                />

                <div className="my-4 border-t border-slate-100" />

                <PriceRow
                  label="Subtotal"
                  value={
                    subtotal
                  }
                />

                <div className="mt-5 rounded-xl bg-[#071A33] p-4 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white/60">
                      Booking Total
                    </span>

                    <span className="flex items-center text-xl font-extrabold">
                      <IndianRupee className="h-4 w-4" />

                      {new Intl.NumberFormat(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        }
                      ).format(
                        bookingTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT                                                             */}
        {/* ---------------------------------------------------------------- */}

        <aside className="space-y-6">
          {/* ============================================================ */}
          {/* BOOKING STATUS                                                */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <ShieldCheck className="h-5 w-5" />
              }
              title="Booking Status"
              description="Current reservation lifecycle."
            />

            <div className="space-y-4 p-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Current Status
                </p>

                <div className="mt-3">
                  <BookingStatusBadge
                    status={
                      booking.bookingStatus
                    }
                  />
                </div>
              </div>

              {(canConfirm ||
                canComplete ||
                canCancel) && (
                <div className="space-y-2">
                  {canConfirm && (
                    <button
                      type="button"
                      onClick={() =>
                        setAction({
                          kind: "booking",
                          action: "confirm",
                        })
                      }
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Confirm Booking
                    </button>
                  )}

                  {canComplete && (
                    <button
                      type="button"
                      onClick={() =>
                        setAction({
                          kind: "booking",
                          action: "complete",
                        })
                      }
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#087E8B] text-sm font-bold text-white transition hover:bg-[#066b75]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Completed
                    </button>
                  )}

                  {canCancel && (
                    <button
                      type="button"
                      onClick={() =>
                        setAction({
                          kind: "booking",
                          action: "cancel",
                        })
                      }
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              )}

              {!canConfirm &&
                !canComplete &&
                !canCancel && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                    This booking is in a final state.
                    No further booking status actions
                    are available.
                  </div>
                )}
            </div>
          </section>

          {/* ============================================================ */}
          {/* PAYMENT                                                        */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <CircleDollarSign className="h-5 w-5" />
              }
              title="Payment"
              description="Manage the payment record separately."
            />

            <div className="space-y-4 p-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Current Payment Status
                </p>

                <div className="mt-3">
                  <PaymentStatusBadge
                    status={
                      booking.paymentStatus
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                {canMarkAdvancePaid && (
                  <button
                    type="button"
                    onClick={() =>
                      setAction({
                        kind: "payment",
                        action:
                          "advance_paid",
                      })
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white text-sm font-bold text-sky-700 transition hover:bg-sky-50"
                  >
                    <CircleDollarSign className="h-4 w-4" />
                    Mark Advance Paid
                  </button>
                )}

                {canMarkPaid && (
                  <button
                    type="button"
                    onClick={() =>
                      setAction({
                        kind: "payment",
                        action: "paid",
                      })
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Fully Paid
                  </button>
                )}

                {canRefund && (
                  <button
                    type="button"
                    onClick={() =>
                      setAction({
                        kind: "payment",
                        action: "refunded",
                      })
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Mark Refunded
                  </button>
                )}

                {!canMarkAdvancePaid &&
                  !canMarkPaid &&
                  !canRefund && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                      This payment is in a final
                      state. No further payment actions
                      are available.
                    </div>
                  )}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* PACKAGE SNAPSHOT                                              */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={
                <Clock3 className="h-5 w-5" />
              }
              title="Package Snapshot"
              description="Information stored when the booking was created."
            />

            <div className="space-y-4 p-6">
              <InfoItem
                label="Package"
                value={
                  packageName
                }
              />

              <InfoItem
                label="Duration"
                value={
                  packageDuration
                }
              />

              <InfoItem
                label="Original Price"
                value={formatCurrency(
                  originalPrice
                )}
              />

              <InfoItem
                label="Booking Price"
                value={formatCurrency(
                  bookingPrice
                )}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* RECORD INFORMATION                                            */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Record Information
              </p>

              <div className="mt-5 space-y-4">
                <InfoItem
                  label="Booking Number"
                  value={`#${booking.bookingNumber}`}
                />

                <InfoItem
                  label="Created"
                  value={formatDateTime(
                    booking.createdAt
                  )}
                />

                <InfoItem
                  label="Last Updated"
                  value={formatDateTime(
                    booking.updatedAt
                  )}
                />
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* ================================================================== */}
      {/* CONFIRMATION MODAL                                                */}
      {/* ================================================================== */}

      {action && (
        <ActionConfirmationModal
          action={action}
          booking={booking}
          loading={updating}
          onClose={() => {
            if (!updating) {
              setAction(null);
            }
          }}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}

/* ========================================================================= */
/* BOOKING TIMELINE                                                          */
/* ========================================================================= */

function BookingTimeline({
  status,
}: {
  status: BookingStatus;
}) {
  const steps: {
    key: BookingStatus;
    label: string;
    description: string;
  }[] = [
    {
      key: "pending",
      label: "Pending",
      description:
        "Booking request received",
    },
    {
      key: "confirmed",
      label: "Confirmed",
      description:
        "Journey confirmed",
    },
    {
      key: "completed",
      label: "Completed",
      description:
        "Journey successfully completed",
    },
  ];

  if (status === "cancelled") {
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <XCircle className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Booking Cancelled
            </p>

            <p className="mt-1 text-xs text-slate-500">
              This reservation is now in a final state.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentIndex =
    steps.findIndex(
      (step) => step.key === status
    );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Booking Journey
        </p>

        <h2 className="mt-1 text-sm font-bold text-slate-900">
          Reservation Progress
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => {
          const completed =
            index <= currentIndex;

          const current =
            index === currentIndex;

          return (
            <div
              key={step.key}
              className="relative"
            >
              {index > 0 && (
                <div
                  className={`
                    absolute -left-4 top-5 hidden h-px w-4 sm:block
                    ${
                      index <= currentIndex
                        ? "bg-[#087E8B]"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}

              <div className="flex items-start gap-3">
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                    ${
                      completed
                        ? "bg-[#087E8B] text-white"
                        : "bg-slate-100 text-slate-400"
                    }
                    ${
                      current
                        ? "ring-4 ring-[#087E8B]/10"
                        : ""
                    }
                  `}
                >
                  {completed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <div>
                  <p
                    className={`
                      text-sm font-bold
                      ${
                        current
                          ? "text-[#071A33]"
                          : completed
                            ? "text-slate-700"
                            : "text-slate-400"
                      }
                    `}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ========================================================================= */
/* ACTION CONFIRMATION MODAL                                                 */
/* ========================================================================= */

function ActionConfirmationModal({
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
  const config =
    action.kind === "booking"
      ? BOOKING_ACTION_CONFIG[
          action.action
        ]
      : PAYMENT_ACTION_CONFIG[
          action.action
        ];

  const Icon = config.icon;

  const isDanger =
    action.kind === "booking" &&
    action.action === "cancel";

  const isRefund =
    action.kind === "payment" &&
    action.action === "refunded";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close confirmation dialog"
        onClick={onClose}
        disabled={loading}
        className="absolute inset-0 cursor-default bg-slate-950/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-action-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="p-6 sm:p-7">
          {/* Top */}
          <div className="flex items-start justify-between gap-4">
            <div
              className={`
                flex h-12 w-12 items-center justify-center rounded-2xl
                ${config.iconClass}
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

          {/* Heading */}
          <h2
            id="booking-action-title"
            className="mt-5 text-xl font-bold text-slate-900"
          >
            {config.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {config.description}
          </p>

          {/* Booking Summary */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Booking
              </span>

              <span className="text-xs font-extrabold text-[#071A33]">
                #{booking.bookingNumber}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-sm font-bold text-slate-800">
                {booking.customerName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {booking.packageSnapshot?.name ||
                  booking.package?.name ||
                  "Package unavailable"}
              </p>

              {action.kind ===
                "payment" && (
                <div className="mt-3">
                  <PaymentStatusBadge
                    status={
                      booking.paymentStatus
                    }
                    compact
                  />
                </div>
              )}
            </div>
          </div>

          {/* Warning */}
          {(isDanger || isRefund) && (
            <div className="mt-4 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

              <span>
                {isDanger
                  ? "Please make sure you have reviewed the booking before cancelling it."
                  : "Please make sure the actual refund has already been processed before marking this payment as refunded."}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${config.buttonClass}`}
            >
              {loading ? (
                <>
                  <Clock3 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Icon className="h-4 w-4" />
                  {config.confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* SECTION HEADER                                                            */
/* ========================================================================= */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/5 text-[#087E8B]">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* INFO ITEM                                                                 */
/* ========================================================================= */

function InfoItem({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  href?: string;
}) {
  const content = (
    <div className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-slate-800">
      {icon && (
        <span className="shrink-0 text-[#087E8B]">
          {icon}
        </span>
      )}

      <span className="break-words">
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      {href ? (
        <a
          href={href}
          className="block transition hover:text-[#087E8B]"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

/* ========================================================================= */
/* NUMBER CARD                                                               */
/* ========================================================================= */

function NumberCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold text-[#071A33]">
        {value}
      </p>
    </div>
  );
}

/* ========================================================================= */
/* PRICE ROW                                                                 */
/* ========================================================================= */

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-medium text-slate-500">
        {label}
      </span>

      <span className="font-bold text-slate-800">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(value)}
      </span>
    </div>
  );
}
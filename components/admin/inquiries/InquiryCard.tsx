"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Users,
  X,
  XCircle,
} from "lucide-react";

import InquiryStatusBadge from "./InquiryStatusBadge";

import type { InquiryData } from "./InquiryListing";
import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

interface Props {
  inquiry: InquiryData;
  onStatusChanged: () => void | Promise<void>;
}

type ActionType =
  | "contacted"
  | "quoted"
  | "confirmed"
  | "cancelled";

const ACTION_LABELS: Record<
  ActionType,
  string
> = {
  contacted: "Mark Contacted",
  quoted: "Mark Quoted",
  confirmed: "Confirm Inquiry",
  cancelled: "Cancel Inquiry",
};

export default function InquiryCard({
  inquiry,
  onStatusChanged,
}: Props) {
  const [action, setAction] =
    useState<ActionType | null>(null);

  const [updating, setUpdating] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!action) return;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        !updating
      ) {
        setAction(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [action, updating]);

  useEffect(() => {
    if (!action) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [action]);

  const formatDate = (
    value?: string,
  ) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ).format(date);
  };

  const destinationName =
    inquiry.destination?.name ??
    "Destination unavailable";

  const handleStatusUpdate =
    async () => {
      if (!action) return;

      try {
        setUpdating(true);
        setError("");

        const response = await fetch(
          `/api/inquiries/${inquiry._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status: action,
            }),
          },
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Unable to update inquiry.",
          );
        }

        setAction(null);

        await onStatusChanged();
      } catch (updateError) {
        setError(
          updateError instanceof Error
            ? updateError.message
            : "Unable to update inquiry.",
        );
      } finally {
        setUpdating(false);
      }
    };

  const renderActions = () => {
    switch (inquiry.status) {
      case "pending":
        return (
          <>
            <button
              type="button"
              onClick={() =>
                setAction("contacted")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-sky-600 px-3.5 text-[11px] font-bold text-white transition hover:bg-sky-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Contacted
            </button>

            <button
              type="button"
              onClick={() =>
                setAction("cancelled")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 text-[11px] font-bold text-red-600 transition hover:bg-red-50"
            >
              <XCircle className="h-3.5 w-3.5" />
              Cancel
            </button>
          </>
        );

      case "contacted":
        return (
          <>
            <button
              type="button"
              onClick={() =>
                setAction("quoted")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-3.5 text-[11px] font-bold text-white transition hover:bg-violet-700"
            >
              <FileText className="h-3.5 w-3.5" />
              Quoted
            </button>

            <button
              type="button"
              onClick={() =>
                setAction("cancelled")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 text-[11px] font-bold text-red-600 transition hover:bg-red-50"
            >
              <XCircle className="h-3.5 w-3.5" />
              Cancel
            </button>
          </>
        );

      case "quoted":
        return (
          <>
            <button
              type="button"
              onClick={() =>
                setAction("confirmed")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-[11px] font-bold text-white transition hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Confirm
            </button>

            <button
              type="button"
              onClick={() =>
                setAction("cancelled")
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 text-[11px] font-bold text-red-600 transition hover:bg-red-50"
            >
              <XCircle className="h-3.5 w-3.5" />
              Cancel
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
        <div className="p-5 sm:p-6">
          {/* Top */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                  #{inquiry.inquiryNumber}
                </span>

                <span className="text-slate-200">
                  •
                </span>

                <InquiryStatusBadge
                  status={
                    inquiry.status
                  }
                />
              </div>

              <h2 className="mt-3 text-lg font-extrabold text-[#071A33]">
                {inquiry.fullName ||
                  "Unnamed customer"}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {destinationName}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(
                    inquiry.travelDate,
                  )}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {inquiry.travelers}{" "}
                  {inquiry.travelers ===
                  1
                    ? "traveller"
                    : "travellers"}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${inquiry.phone}`}
                aria-label={`Call ${inquiry.fullName}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#087E8B]"
              >
                <Phone className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${inquiry.phone.replace(
                  /\D/g,
                  "",
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${inquiry.fullName}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#087E8B]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Details */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              label="Phone"
              value={
                inquiry.phone || "—"
              }
            />

            <DetailItem
              label="Email"
              value={
                inquiry.email || "—"
              }
            />

            <DetailItem
              label="Budget"
              value={
                inquiry.budget ||
                "Not specified"
              }
            />

            <DetailItem
              label="Pickup"
              value={
                inquiry.pickupLocation ||
                "Not specified"
              }
            />
          </div>

          {/* Message */}

          {inquiry.message && (
            <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
              <p className="line-clamp-2 text-xs leading-5 text-slate-500">
                {inquiry.message}
              </p>
            </div>
          )}

          {/* Error */}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Bottom */}

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[10px] text-slate-400">
              Received{" "}
              <span className="font-semibold text-slate-500">
                {formatDate(
                  inquiry.createdAt,
                )}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {renderActions()}

              <Link
                href={`/admin/inquiries/${inquiry._id}`}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-[11px] font-bold text-slate-700 transition hover:bg-slate-50"
              >
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Confirmation Modal */}

      {action && (
        <ConfirmationModal
          action={action}
          inquiry={inquiry}
          loading={updating}
          onClose={() =>
            !updating &&
            setAction(null)
          }
          onConfirm={
            handleStatusUpdate
          }
        />
      )}
    </>
  );
}

/* ========================================================================== */
/* Detail Item                                                               */
/* ========================================================================== */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* Confirmation Modal                                                         */
/* ========================================================================== */

function ConfirmationModal({
  action,
  inquiry,
  loading,
  onClose,
  onConfirm,
}: {
  action: ActionType;
  inquiry: InquiryData;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const isCancel =
    action === "cancelled";

  const iconClass =
    action === "confirmed"
      ? "bg-emerald-50 text-emerald-600"
      : action === "quoted"
        ? "bg-violet-50 text-violet-600"
        : action === "contacted"
          ? "bg-sky-50 text-sky-600"
          : "bg-red-50 text-red-600";

  const Icon =
    action === "confirmed"
      ? CheckCircle2
      : action === "quoted"
        ? FileText
        : action === "contacted"
          ? MessageCircle
          : XCircle;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-card-modal-title"
    >
      <button
        type="button"
        aria-label="Close confirmation"
        onClick={onClose}
        disabled={loading}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
            >
              <Icon className="h-6 w-6" />
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2
            id="inquiry-card-modal-title"
            className="mt-5 text-xl font-extrabold tracking-tight text-slate-900"
          >
            {isCancel
              ? "Cancel this inquiry?"
              : ACTION_LABELS[action] + "?"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isCancel
              ? "This will move the inquiry to Cancelled. Cancelled inquiries cannot be reopened."
              : `The inquiry for ${inquiry.fullName || "this customer"} will be moved to ${action}.`}
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Inquiry
            </p>

            <p className="mt-1 text-sm font-bold text-[#071A33]">
              #{inquiry.inquiryNumber}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {inquiry.destination?.name ??
                "Destination unavailable"}
            </p>
          </div>

          {isCancel && (
            <div className="mt-4 flex gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              This is a terminal action.
            </div>
          )}

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
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition disabled:opacity-50 ${
                isCancel
                  ? "bg-red-600 hover:bg-red-700"
                  : action ===
                      "confirmed"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : action === "quoted"
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-sky-600 hover:bg-sky-700"
              }`}
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}

              {loading
                ? "Updating..."
                : isCancel
                  ? "Cancel Inquiry"
                  : ACTION_LABELS[
                      action
                    ]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
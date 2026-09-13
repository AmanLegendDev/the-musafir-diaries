"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  NotebookPen,
  Phone,
  Save,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

import InquiryStatusBadge from "./InquiryStatusBadge";

import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

interface DestinationData {
  _id: string;
  name: string;
  slug: string;
  city?: string;
  state?: string;
  country?: string;
  status?: string;
}

export interface InquiryDetailsData {
  _id: string;
  inquiryNumber: string;
  fullName: string;
  phone: string;
  email: string;
  destination?: DestinationData | null;
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

interface Props {
  inquiry: InquiryDetailsData;
}

type ActionType =
  | "contacted"
  | "quoted"
  | "confirmed"
  | "cancelled";

const ACTION_CONFIG: Record<
  ActionType,
  {
    title: string;
    description: string;
    confirmText: string;
    icon: typeof CheckCircle2;
    iconClass: string;
    buttonClass: string;
    danger?: boolean;
  }
> = {
  contacted: {
    title: "Mark as Contacted?",
    description:
      "This will move the inquiry from Pending to Contacted.",
    confirmText: "Mark Contacted",
    icon: MessageCircle,
    iconClass:
      "bg-sky-50 text-sky-600",
    buttonClass:
      "bg-sky-600 hover:bg-sky-700",
  },

  quoted: {
    title: "Mark as Quoted?",
    description:
      "Confirm that the customer has received the quotation or trip pricing.",
    confirmText: "Mark Quoted",
    icon: FileText,
    iconClass:
      "bg-violet-50 text-violet-600",
    buttonClass:
      "bg-violet-600 hover:bg-violet-700",
  },

  confirmed: {
    title: "Confirm this inquiry?",
    description:
      "This will mark the customer's enquiry as confirmed.",
    confirmText: "Confirm Inquiry",
    icon: CheckCircle2,
    iconClass:
      "bg-emerald-50 text-emerald-600",
    buttonClass:
      "bg-emerald-600 hover:bg-emerald-700",
  },

  cancelled: {
    title: "Cancel this inquiry?",
    description:
      "This inquiry will be moved to Cancelled and cannot be reopened.",
    confirmText: "Cancel Inquiry",
    icon: XCircle,
    iconClass:
      "bg-red-50 text-red-600",
    buttonClass:
      "bg-red-600 hover:bg-red-700",
    danger: true,
  },
};

export default function InquiryDetails({
  inquiry: initialInquiry,
}: Props) {
  const router = useRouter();

  const [inquiry, setInquiry] =
    useState(initialInquiry);

  const [action, setAction] =
    useState<ActionType | null>(null);

  const [updating, setUpdating] =
    useState(false);

  const [adminNotes, setAdminNotes] =
    useState(
      initialInquiry.adminNotes ?? "",
    );

  const [savingNotes, setSavingNotes] =
    useState(false);

  const [notesSaved, setNotesSaved] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * Escape closes confirmation modal.
   */
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

  /*
   * Lock background scrolling while modal is open.
   */
  useEffect(() => {
    if (!action) {
      document.body.style.overflow =
        "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [action]);

  const destination =
    inquiry.destination;

  const destinationName =
    destination?.name ??
    "Destination unavailable";

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
        month: "long",
        year: "numeric",
      },
    ).format(date);
  };

  const formatDateTime = (
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
        hour: "2-digit",
        minute: "2-digit",
      },
    ).format(date);
  };

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
              "Failed to update inquiry.",
          );
        }

        setInquiry((current) => ({
          ...current,
          status: action,
          updatedAt:
            result?.data?.updatedAt ??
            new Date().toISOString(),
        }));

        setAction(null);

        router.refresh();
      } catch (updateError) {
        setError(
          updateError instanceof Error
            ? updateError.message
            : "Failed to update inquiry.",
        );
      } finally {
        setUpdating(false);
      }
    };

  const handleSaveNotes =
    async () => {
      try {
        setSavingNotes(true);
        setNotesSaved(false);
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
              adminNotes,
            }),
          },
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to save notes.",
          );
        }

        setInquiry((current) => ({
          ...current,
          adminNotes,
          updatedAt:
            result?.data?.updatedAt ??
            new Date().toISOString(),
        }));

        setNotesSaved(true);

        window.setTimeout(() => {
          setNotesSaved(false);
        }, 2500);
      } catch (notesError) {
        setError(
          notesError instanceof Error
            ? notesError.message
            : "Failed to save notes.",
        );
      } finally {
        setSavingNotes(false);
      }
    };

  const currentIndex = {
    pending: 0,
    contacted: 1,
    quoted: 2,
    confirmed: 3,
    cancelled: -1,
  }[inquiry.status];

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header navigation */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/inquiries"
            className="inline-flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#071A33]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Inquiries
          </Link>

          <span className="text-[11px] text-slate-400">
            Updated{" "}
            {formatDateTime(
              inquiry.updatedAt,
            )}
          </span>
        </div>

        {/* Hero */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#071A33]/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#071A33]">
                    Inquiry
                  </span>

                  <span className="text-xs text-slate-300">
                    •
                  </span>

                  <span className="text-xs font-extrabold text-slate-600">
                    #{inquiry.inquiryNumber}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#071A33] sm:text-3xl">
                  {inquiry.fullName ||
                    "Unnamed customer"}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Travel enquiry for{" "}
                  <span className="font-bold text-slate-700">
                    {destinationName}
                  </span>
                </p>
              </div>

              <InquiryStatusBadge
                status={inquiry.status}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:px-8">
            <a
              href={`tel:${inquiry.phone}`}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-[#087E8B]" />
              Call
            </a>

            <a
              href={`https://wa.me/${inquiry.phone.replace(
                /\D/g,
                "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4 text-[#087E8B]" />
              WhatsApp
            </a>

            <a
              href={`mailto:${inquiry.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Mail className="h-4 w-4 text-[#087E8B]" />
              Email
            </a>
          </div>
        </section>

        {/* Error */}

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto rounded-lg p-1 hover:bg-red-100"
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {/* Customer */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading
                icon={
                  <UserRound className="h-4 w-4" />
                }
                eyebrow="Customer"
                title="Contact Information"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  label="Full Name"
                  value={
                    inquiry.fullName ||
                    "—"
                  }
                />

                <InfoItem
                  label="Phone"
                  value={
                    inquiry.phone ||
                    "—"
                  }
                  href={
                    inquiry.phone
                      ? `tel:${inquiry.phone}`
                      : undefined
                  }
                />

                <InfoItem
                  label="Email"
                  value={
                    inquiry.email ||
                    "—"
                  }
                  href={
                    inquiry.email
                      ? `mailto:${inquiry.email}`
                      : undefined
                  }
                />

                <InfoItem
                  label="Received"
                  value={formatDateTime(
                    inquiry.createdAt,
                  )}
                />
              </div>
            </section>

            {/* Journey */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading
                icon={
                  <CalendarDays className="h-4 w-4" />
                }
                eyebrow="Journey"
                title="Travel Details"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  label="Destination"
                  value={
                    destinationName
                  }
                />

                <InfoItem
                  label="Travel Date"
                  value={formatDate(
                    inquiry.travelDate,
                  )}
                />

                <InfoItem
                  label="Travellers"
                  value={`${inquiry.travelers} ${
                    inquiry.travelers ===
                    1
                      ? "traveller"
                      : "travellers"
                  }`}
                />

                <InfoItem
                  label="Pickup Location"
                  value={
                    inquiry.pickupLocation ||
                    "Not specified"
                  }
                />

                <InfoItem
                  label="Budget"
                  value={
                    inquiry.budget ||
                    "Not specified"
                  }
                />

                {destination?.city && (
                  <InfoItem
                    label="Destination Location"
                    value={[
                      destination.city,
                      destination.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                )}
              </div>
            </section>

            {/* Message */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading
                icon={
                  <ClipboardList className="h-4 w-4" />
                }
                eyebrow="Customer Request"
                title="Message"
              />

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {inquiry.message ||
                    "No message was provided."}
                </p>
              </div>
            </section>

            {/* Notes */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading
                icon={
                  <NotebookPen className="h-4 w-4" />
                }
                eyebrow="Internal"
                title="Admin Notes"
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Internal notes are only visible
                to the admin team.
              </p>

              <textarea
                value={adminNotes}
                onChange={(event) =>
                  setAdminNotes(
                    event.target.value,
                  )
                }
                maxLength={2000}
                rows={6}
                placeholder="Call notes, customer preferences, quotation details, follow-up information..."
                className="mt-5 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#087E8B] focus:bg-white focus:ring-4 focus:ring-[#087E8B]/10"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] text-slate-400">
                  {adminNotes.length}/2000
                </span>

                <div className="flex items-center gap-3">
                  {notesSaved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                      Saved
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={
                      handleSaveNotes
                    }
                    disabled={savingNotes}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-4 text-xs font-bold text-white transition hover:bg-[#0D2747] disabled:opacity-60"
                  >
                    {savingNotes ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}

                    {savingNotes
                      ? "Saving..."
                      : "Save Notes"}
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {/* Lifecycle */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                icon={
                  <Clock3 className="h-4 w-4" />
                }
                eyebrow="Lifecycle"
                title="Inquiry Status"
              />

              <div className="mt-6">
                <StatusTimeline
                  status={
                    inquiry.status
                  }
                  currentIndex={
                    currentIndex
                  }
                />
              </div>

              <StatusActions
                status={
                  inquiry.status
                }
                onAction={setAction}
              />
            </section>

            {/* Destination */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                icon={
                  <MapPin className="h-4 w-4" />
                }
                eyebrow="Destination"
                title="Selected Destination"
              />

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-extrabold text-[#071A33]">
                  {destinationName}
                </p>

                {(destination?.city ||
                  destination?.state) && (
                  <p className="mt-1 text-xs text-slate-500">
                    {[
                      destination.city,
                      destination.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            </section>

            {/* Record */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                icon={
                  <FileText className="h-4 w-4" />
                }
                eyebrow="Record"
                title="Inquiry Information"
              />

              <div className="mt-5 space-y-4">
                <RecordRow
                  label="Reference"
                  value={
                    inquiry.inquiryNumber
                  }
                />

                <RecordRow
                  label="Created"
                  value={formatDateTime(
                    inquiry.createdAt,
                  )}
                />

                <RecordRow
                  label="Updated"
                  value={formatDateTime(
                    inquiry.updatedAt,
                  )}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>

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
/* Helpers                                                                    */
/* ========================================================================== */

function SectionHeading({
  icon,
  eyebrow,
  title,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
        {icon}
      </div>

      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
          {eyebrow}
        </p>

        <h2 className="mt-0.5 text-base font-extrabold text-[#071A33]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      className="block rounded-xl transition hover:bg-slate-50"
    >
      {content}
    </a>
  );
}

function RecordRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="max-w-[65%] break-words text-right text-xs font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}

/* ========================================================================== */
/* Status Actions                                                             */
/* ========================================================================== */

function StatusActions({
  status,
  onAction,
}: {
  status: InquiryStatus;
  onAction: (
    action: ActionType,
  ) => void;
}) {
  if (status === "confirmed") {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-bold text-emerald-800">
              Inquiry Confirmed
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-700/80">
              This inquiry is now read-only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-bold text-red-800">
              Inquiry Cancelled
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700/80">
              This inquiry is now read-only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-2">
      {status === "pending" && (
        <>
          <ActionButton
            label="Mark Contacted"
            icon={
              <MessageCircle className="h-4 w-4" />
            }
            onClick={() =>
              onAction("contacted")
            }
            className="bg-sky-600 hover:bg-sky-700"
          />

          <ActionButton
            label="Cancel Inquiry"
            icon={
              <XCircle className="h-4 w-4" />
            }
            onClick={() =>
              onAction("cancelled")
            }
            className="border border-red-200 bg-white text-red-600 hover:bg-red-50"
          />
        </>
      )}

      {status === "contacted" && (
        <>
          <ActionButton
            label="Mark Quoted"
            icon={
              <FileText className="h-4 w-4" />
            }
            onClick={() =>
              onAction("quoted")
            }
            className="bg-violet-600 hover:bg-violet-700"
          />

          <ActionButton
            label="Cancel Inquiry"
            icon={
              <XCircle className="h-4 w-4" />
            }
            onClick={() =>
              onAction("cancelled")
            }
            className="border border-red-200 bg-white text-red-600 hover:bg-red-50"
          />
        </>
      )}

      {status === "quoted" && (
        <>
          <ActionButton
            label="Confirm Inquiry"
            icon={
              <CheckCircle2 className="h-4 w-4" />
            }
            onClick={() =>
              onAction("confirmed")
            }
            className="bg-emerald-600 hover:bg-emerald-700"
          />

          <ActionButton
            label="Cancel Inquiry"
            icon={
              <XCircle className="h-4 w-4" />
            }
            onClick={() =>
              onAction("cancelled")
            }
            className="border border-red-200 bg-white text-red-600 hover:bg-red-50"
          />
        </>
      )}
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  className,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold text-white transition ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ========================================================================== */
/* Timeline                                                                   */
/* ========================================================================== */

function StatusTimeline({
  status,
  currentIndex,
}: {
  status: InquiryStatus;
  currentIndex: number;
}) {
  if (status === "cancelled") {
    return (
      <div>
        <TimelineItem
          label="Pending"
          state="completed"
          last={false}
        />

        <TimelineItem
          label="Cancelled"
          state="cancelled"
          last
        />
      </div>
    );
  }

  const steps = [
    "Pending",
    "Contacted",
    "Quoted",
    "Confirmed",
  ];

  return (
    <div>
      {steps.map(
        (label, index) => (
          <TimelineItem
            key={label}
            label={label}
            state={
              index < currentIndex
                ? "completed"
                : index === currentIndex
                  ? "current"
                  : "upcoming"
            }
            last={
              index ===
              steps.length - 1
            }
          />
        ),
      )}
    </div>
  );
}

function TimelineItem({
  label,
  state,
  last,
}: {
  label: string;
  state:
    | "completed"
    | "current"
    | "upcoming"
    | "cancelled";
  last: boolean;
}) {
  const completed =
    state === "completed";

  const current =
    state === "current";

  const cancelled =
    state === "cancelled";

  return (
    <div className="relative flex min-h-[58px] gap-3">
      <div className="relative flex w-5 shrink-0 justify-center">
        {!last && (
          <span
            className={`absolute top-5 h-full w-px ${
              completed
                ? "bg-emerald-300"
                : "bg-slate-200"
            }`}
          />
        )}

        <span
          className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            cancelled
              ? "border-red-500 bg-red-50 text-red-500"
              : completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : current
                  ? "border-[#087E8B] bg-[#087E8B] text-white"
                  : "border-slate-200 bg-white"
          }`}
        >
          {completed && (
            <Check className="h-3 w-3" />
          )}

          {current && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}

          {cancelled && (
            <X className="h-3 w-3" />
          )}
        </span>
      </div>

      <div className="pb-5">
        <p
          className={`text-xs font-bold ${
            cancelled
              ? "text-red-600"
              : completed ||
                  current
                ? "text-slate-800"
                : "text-slate-400"
          }`}
        >
          {label}
        </p>

        {current && (
          <p className="mt-0.5 text-[10px] text-slate-400">
            Current status
          </p>
        )}
      </div>
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
  inquiry: InquiryDetailsData;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const config =
    ACTION_CONFIG[action];

  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-details-confirmation-title"
    >
      <button
        type="button"
        aria-label="Close confirmation"
        onClick={onClose}
        disabled={loading}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconClass}`}
            >
              <Icon className="h-6 w-6" />
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 disabled:opacity-40"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2
            id="inquiry-details-confirmation-title"
            className="mt-5 text-xl font-extrabold tracking-tight text-slate-900"
          >
            {config.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {config.description}
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Inquiry
            </p>

            <p className="mt-1 text-sm font-extrabold text-[#071A33]">
              #{inquiry.inquiryNumber}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {inquiry.fullName} ·{" "}
              {inquiry.destination
                ?.name ??
                "Destination unavailable"}
            </p>
          </div>

          {config.danger && (
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
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition disabled:opacity-60 ${config.buttonClass}`}
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
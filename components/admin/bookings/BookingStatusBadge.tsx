import {
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  compact?: boolean;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    icon: Clock3,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 ring-red-200",
    icon: XCircle,
  },
  completed: {
    label: "Completed",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
    icon: CheckCircle2,
  },
};

export default function BookingStatusBadge({
  status,
  compact = false,
}: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full
        font-bold
        ring-1 ring-inset
        ${config.className}
        ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"}
      `}
    >
      <Icon
        className={compact ? "h-3 w-3" : "h-3.5 w-3.5"}
        strokeWidth={2.2}
      />

      {config.label}
    </span>
  );
}
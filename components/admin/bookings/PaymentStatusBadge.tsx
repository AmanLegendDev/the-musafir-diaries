import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  RotateCcw,
} from "lucide-react";

export type PaymentStatus =
  | "pending"
  | "advance_paid"
  | "paid"
  | "refunded";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  compact?: boolean;
}

const PAYMENT_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  pending: {
    label: "Payment Pending",
    className:
      "bg-amber-50 text-amber-700 ring-amber-200",
    icon: Clock3,
  },

  advance_paid: {
    label: "Advance Paid",
    className:
      "bg-sky-50 text-sky-700 ring-sky-200",
    icon: CircleDollarSign,
  },

  paid: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
  },

  refunded: {
    label: "Refunded",
    className:
      "bg-slate-100 text-slate-600 ring-slate-200",
    icon: RotateCcw,
  },
};

export default function PaymentStatusBadge({
  status,
  compact = false,
}: PaymentStatusBadgeProps) {
  const config = PAYMENT_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full
        font-bold
        ring-1 ring-inset
        ${config.className}
        ${
          compact
            ? "px-2.5 py-1 text-[10px]"
            : "px-3 py-1.5 text-xs"
        }
      `}
    >
      <Icon
        className={
          compact
            ? "h-3 w-3"
            : "h-3.5 w-3.5"
        }
        strokeWidth={2.2}
      />

      {config.label}
    </span>
  );
}
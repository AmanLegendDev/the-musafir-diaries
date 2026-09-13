import {
  AlertCircle,
  CheckCircle2,
  FileText,
  MessageCircle,
  XCircle,
} from "lucide-react";

import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

interface Props {
  status: InquiryStatus;
}

const STATUS_CONFIG: Record<
  InquiryStatus,
  {
    label: string;
    className: string;
    icon: typeof AlertCircle;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: AlertCircle,
  },

  contacted: {
    label: "Contacted",
    className:
      "border-sky-200 bg-sky-50 text-sky-700",
    icon: MessageCircle,
  },

  quoted: {
    label: "Quoted",
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
    icon: FileText,
  },

  confirmed: {
    label: "Confirmed",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },

  cancelled: {
    label: "Cancelled",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
  },
};

export default function InquiryStatusBadge({
  status,
}: Props) {
  const config =
    STATUS_CONFIG[status] ??
    STATUS_CONFIG.pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
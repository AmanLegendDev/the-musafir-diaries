"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  AlertCircle,
  CheckCircle2,
  CircleDot,
  FileText,
  MessageCircle,
  XCircle,
} from "lucide-react";

import type { InquiryStatus } from "@/lib/inquiry/inquiry-status";

interface Props {
  counts: {
    total: number;
    pending: number;
    contacted: number;
    quoted: number;
    confirmed: number;
    cancelled: number;
  };
}

type TabStatus = InquiryStatus | "";

const TABS: Array<{
  value: TabStatus;
  label: string;
  icon: typeof CircleDot;
}> = [
  {
    value: "",
    label: "All",
    icon: CircleDot,
  },
  {
    value: "pending",
    label: "Pending",
    icon: AlertCircle,
  },
  {
    value: "contacted",
    label: "Contacted",
    icon: MessageCircle,
  },
  {
    value: "quoted",
    label: "Quoted",
    icon: FileText,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
  },
];

export default function InquiryStatusTabs({
  counts,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const activeStatus =
    searchParams.get("status") ?? "";

  const countMap: Record<
    TabStatus,
    number
  > = {
    "": counts.total,
    pending: counts.pending,
    contacted: counts.contacted,
    quoted: counts.quoted,
    confirmed: counts.confirmed,
    cancelled: counts.cancelled,
  };

  const handleChange = (
    value: TabStatus,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    router.replace(
      `${pathname}${
        params.toString()
          ? `?${params.toString()}`
          : ""
      }`,
      {
        scroll: false,
      },
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active =
            activeStatus === tab.value;

          return (
            <button
              key={tab.value || "all"}
              type="button"
              onClick={() =>
                handleChange(tab.value)
              }
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-bold transition ${
                active
                  ? "bg-[#071A33] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />

              <span>{tab.label}</span>

              <span
                className={`min-w-5 rounded-full px-1.5 py-0.5 text-[10px] ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {countMap[tab.value]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
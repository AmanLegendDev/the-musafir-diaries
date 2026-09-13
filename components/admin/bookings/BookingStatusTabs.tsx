"use client";

import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ListFilter,
  XCircle,
} from "lucide-react";

import type { BookingStatus } from "./BookingStatusBadge";

export type BookingFilter = "all" | BookingStatus;

interface BookingStatusTabsProps {
  value: BookingFilter;
  onChange: (value: BookingFilter) => void;
  counts: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
}

const TABS: {
  key: BookingFilter;
  label: string;
  icon: typeof ListFilter;
  countKey:
    | "total"
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed";
}[] = [
  {
    key: "all",
    label: "All",
    icon: ListFilter,
    countKey: "total",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    countKey: "pending",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
    countKey: "confirmed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    countKey: "cancelled",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CalendarCheck,
    countKey: "completed",
  },
];

export default function BookingStatusTabs({
  value,
  onChange,
  counts,
}: BookingStatusTabsProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-1 rounded-xl bg-slate-100 p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = value === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`
                inline-flex h-10 items-center gap-2
                rounded-lg
                px-3.5
                text-xs font-bold
                transition-all duration-200

                ${
                  active
                    ? "bg-white text-[#071A33] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              <Icon className="h-4 w-4" />

              <span>{tab.label}</span>

              <span
                className={`
                  min-w-6 rounded-full px-1.5 py-0.5 text-center text-[10px]
                  ${
                    active
                      ? "bg-[#071A33] text-white"
                      : "bg-white/70 text-slate-500"
                  }
                `}
              >
                {counts[tab.countKey]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
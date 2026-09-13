import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  FileText,
  MapPin,
  Users,
} from "lucide-react";

import InquiryStatusBadge from "@/components/admin/inquiries/InquiryStatusBadge";

import type {
  DashboardInquiry,
} from "@/lib/dashboard/dashboard-data";

interface Props {
  inquiries: DashboardInquiry[];
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

export default function RecentInquiries({
  inquiries,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.045)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087E8B]/[0.08] text-[#087E8B]">
              <FileText className="h-4 w-4" />
            </span>

            <div>
              <h2 className="text-base font-bold text-[#071A33]">
                Recent inquiries
              </h2>

              <p className="text-xs text-slate-400">
                Latest customer conversations
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/inquiries"
          className="group inline-flex items-center gap-1 text-xs font-bold text-[#087E8B]"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
            <FileText className="h-5 w-5" />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            No inquiries yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            New customer enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {inquiries.map((inquiry) => (
            <Link
              key={inquiry._id}
              href={`/admin/inquiries/${inquiry._id}`}
              className="group block px-5 py-5 transition-colors hover:bg-slate-50/70 sm:px-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-bold text-[#071A33]">
                      {inquiry.fullName}
                    </p>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {inquiry.inquiryNumber}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {inquiry.destination?.name ??
                        "Destination unavailable"}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(inquiry.travelDate)}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {inquiry.travelers}{" "}
                      {inquiry.travelers === 1
                        ? "traveller"
                        : "travellers"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <InquiryStatusBadge
                    status={inquiry.status}
                  />

                  <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#087E8B]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
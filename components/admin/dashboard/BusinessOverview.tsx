import BusinessCard from "./BusinessCard";
import type {
  DashboardStats,
} from "@/lib/dashboard/dashboard-data";

interface Props {
  inquiries: DashboardStats["inquiries"];
  bookings: DashboardStats["bookings"];
}

export default function BusinessOverview({
  inquiries,
  bookings,
}: Props) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
            Business
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#071A33]">
            Manage your business
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep an eye on conversations and confirmed journeys.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BusinessCard
          type="inquiries"
          total={inquiries.total}
          statuses={[
            {
              label: "Pending",
              value: inquiries.pending,
              tone: "amber",
            },
            {
              label: "Contacted",
              value: inquiries.contacted,
              tone: "sky",
            },
            {
              label: "Quoted",
              value: inquiries.quoted,
              tone: "violet",
            },
            {
              label: "Confirmed",
              value: inquiries.confirmed,
              tone: "emerald",
            },
          ]}
        />

        <BusinessCard
          type="bookings"
          total={bookings.total}
          statuses={[
            {
              label: "Pending",
              value: bookings.pending,
              tone: "amber",
            },
            {
              label: "Confirmed",
              value: bookings.confirmed,
              tone: "emerald",
            },
            {
              label: "Completed",
              value: bookings.completed,
              tone: "sky",
            },
            {
              label: "Cancelled",
              value: bookings.cancelled,
              tone: "red",
            },
          ]}
        />
      </div>
    </section>
  );
}
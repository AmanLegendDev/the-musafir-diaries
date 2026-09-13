import WelcomeHeader from "./WelcomeHeader";
import BusinessOverview from "./BusinessOverview";
import ContentOverview from "./ContentOverview";
import RecentInquiries from "./RecentInquiries";
import RecentBookings from "./RecentBookings";
import QuickActions from "./QuickActions";
import type { DashboardData } from "@/lib/dashboard/dashboard-data";

interface DashboardProps {
  data: DashboardData;
}

export default function Dashboard({
  data,
}: DashboardProps) {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-8 pb-10">
      <WelcomeHeader />

      <BusinessOverview
        inquiries={data.stats.inquiries}
        bookings={data.stats.bookings}
      />

      <ContentOverview
        content={data.stats.content}
      />

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentInquiries
          inquiries={data.recentInquiries}
        />

        <RecentBookings
          bookings={data.recentBookings}
        />
      </div>

      <QuickActions />
    </div>
  );
}
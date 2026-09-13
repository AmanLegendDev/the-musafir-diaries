import {
  getDashboardData,
} from "@/lib/dashboard/dashboard-data";

import Dashboard from "@/components/admin/dashboard/Dashboard";

export const dynamic =
  "force-dynamic";

export const revalidate = 0;

export default async function DashboardPage() {
  const dashboardData =
    await getDashboardData();

  return (
    <Dashboard
      data={dashboardData}
    />
  );
}
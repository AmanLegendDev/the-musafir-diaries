import { NextResponse } from "next/server";

import {
  getDashboardData,
} from "@/lib/dashboard/dashboard-data";

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                     */
/* -------------------------------------------------------------------------- */

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* -------------------------------------------------------------------------- */
/* GET DASHBOARD DATA                                                         */
/* -------------------------------------------------------------------------- */

export async function GET() {
  try {
    const dashboardData =
      await getDashboardData();

    return NextResponse.json(
      {
        success: true,
        data: dashboardData,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN DASHBOARD API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load dashboard data.",
      },
      {
        status: 500,
      },
    );
  }
}
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/layout/AdminShell";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
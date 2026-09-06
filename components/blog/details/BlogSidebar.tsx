"use client";

import { ReactNode } from "react";

interface BlogSidebarProps {
  children: ReactNode;
}

export default function BlogSidebar({
  children,
}: BlogSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">

      <div className="space-y-6">

        {children}

      </div>

    </aside>
  );
}
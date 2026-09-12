"use client";

import type { ReactNode } from "react";

interface BookingShellProps {
  progress: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
}

export default function BookingShell({
  progress,
  main,
  sidebar,
}: BookingShellProps) {
  return (
    <section className="bg-[#FAF9F5]">
      {progress}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px] xl:gap-12">
          {/* Main */}

          <main className="min-w-0">
            {main}
          </main>

          {/* Sidebar */}

          <aside className="min-w-0 lg:sticky lg:top-28">
            {sidebar}
          </aside>
        </div>
      </div>
    </section>
  );
}
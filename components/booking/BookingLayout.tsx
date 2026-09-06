"use client";

import { ReactNode } from "react";

interface BookingLayoutProps {
  wizard: ReactNode;
  summary: ReactNode;
}

export default function BookingLayout({
  wizard,
  summary,
}: BookingLayoutProps) {
  return (
    <section className="relative bg-[#F8FAFC] py-16 lg:py-24">
      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
   <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_360px] lg:items-start">

  <div className="min-w-0 w-full">
    {wizard}
  </div>

  <aside className="min-w-0 lg:sticky lg:top-28">
    {summary}
  </aside>

</div>
      </div>
    </section>
  );
}
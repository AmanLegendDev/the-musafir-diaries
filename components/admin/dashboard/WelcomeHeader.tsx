import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  Sparkles,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

function formatToday() {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date());
}

export default function WelcomeHeader() {
  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[#071A33] shadow-[0_20px_70px_rgba(7,26,51,0.16)]">
      {/* Decorative atmosphere */}
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#087E8B]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 right-1/3 h-72 w-72 rounded-full bg-[#1597C7]/10 blur-3xl" />

      <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span>The Musafir Diaries · Admin</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
              {getGreeting()},{" "}
              <span className="text-[#7DD3E5]">
                Reena Thakur
              </span>
              <span className="ml-2">👋</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Welcome back. Here&apos;s a clear view of
              your journeys, enquiries, bookings and
              content — all in one place.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85 backdrop-blur-sm">
              <CalendarDays className="h-4 w-4 text-[#7DD3E5]" />
              <span>{formatToday()}</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
            >
              <Compass className="h-4 w-4" />
              View website
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
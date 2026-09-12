import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function TestimonialsCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      {/* Decorative mountain-inspired shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#087E8B]/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#1597C7]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F59E0B]">
              <Compass className="h-4.5 w-4.5" />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Your story starts here
            </p>
          </div>

          <h2 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Ready to create a journey worth remembering?
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Tell us where you want to go, what you want to experience,
            and we&apos;ll help shape the journey around you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/destinations"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
            >
              Explore destinations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Plan my journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
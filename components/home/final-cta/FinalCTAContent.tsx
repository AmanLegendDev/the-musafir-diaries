import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";

export default function FinalCTAContent() {
  return (
    <div className="relative z-10 flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-20">
      <div className="max-w-xl">
        {/* Eyebrow */}
        <div className="mb-7 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#F59E0B]"
          />

          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
            Your Next Journey
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-[#FAF9F5] sm:text-5xl lg:text-6xl xl:text-[68px]">
          Your next story
          <span className="block text-[#1597C7]">
            could begin here.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
          The mountains are waiting. Let&apos;s plan something
          worth remembering — thoughtfully, beautifully and at
          your own pace.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/inquiry"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold text-[#071A33] transition-all duration-300 hover:bg-white hover:shadow-[0_12px_40px_rgba(245,158,11,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B]"
          >
            Plan Your Journey

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#071A33] text-[#FAF9F5] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </span>
          </Link>

          <Link
            href="/destinations"
            className="group inline-flex w-fit items-center gap-2 px-2 py-3 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1597C7]"
          >
            <Compass
              aria-hidden="true"
              className="h-4 w-4 text-[#1597C7]"
            />

            Explore the Himalayas

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Small trust line */}
        <div className="mt-12 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
          />

          <span className="text-xs tracking-wide text-white/65">
            Explore · Experience · Belong
          </span>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function FAQCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      {/* Atmospheric details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#087E8B]/12 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#1597C7]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          {/* Eyebrow */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
                Still wondering?
              </span>
            </div>

            <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75">
              <MessageCircle
                className="h-5 w-5"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Some journeys need a conversation.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              If you couldn&apos;t find what you were looking for,
              tell us what you have in mind. We&apos;ll help you
              figure out the rest.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
              >
                Talk to our travel team

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/destinations"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Explore destinations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
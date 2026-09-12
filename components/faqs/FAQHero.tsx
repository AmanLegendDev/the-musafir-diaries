import Link from "next/link";
import { ArrowDown, MessageCircleQuestion } from "lucide-react";

export default function FAQHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5]">
      {/* Subtle atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#087E8B]/6 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          {/* Editorial introduction */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-11 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
                Questions, answered
              </span>
            </div>

            <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#087E8B]/15 bg-white text-[#087E8B] shadow-sm">
              <MessageCircleQuestion
                className="h-6 w-6"
                strokeWidth={1.5}
              />
            </div>

            <h1 className="mt-7 max-w-lg font-serif text-[3.5rem] font-medium leading-[0.98] tracking-[-0.045em] text-[#071A33] sm:text-6xl lg:text-[5.25rem]">
              Before you
              <span className="block text-[#087E8B]">
                set off.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-[#071A33]/60 sm:text-lg sm:leading-8">
              A few things worth knowing before your journey
              begins. And if you still have a question, we are
              only a conversation away.
            </p>

            <Link
              href="#questions"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#071A33]"
            >
              Explore questions
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#071A33]/12 transition duration-300 group-hover:border-[#087E8B]/30 group-hover:bg-[#087E8B]/6">
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </Link>
          </div>

          {/* Right-side editorial statement */}
          <div className="lg:pb-1">
            <div className="border-t border-[#071A33]/10 pt-7">
              <div className="flex gap-5">
                <span className="pt-1 text-xs font-medium tracking-[0.12em] text-[#071A33]/25">
                  01
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                    Travel, simply considered
                  </p>

                  <p className="mt-4 max-w-2xl font-serif text-2xl leading-[1.3] tracking-[-0.025em] text-[#071A33] sm:text-3xl lg:text-[2.15rem]">
                    The right journey starts with knowing what
                    to expect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
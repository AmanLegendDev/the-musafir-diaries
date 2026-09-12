import Link from "next/link";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";

export default function HotelCTA() {
  return (
    <section className="bg-[#071A33]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D2747] px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/5" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#F59E0B]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                  Your journey, your stay
                </span>
              </div>

              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                Not sure where
                <span className="text-[#F59E0B]"> to stay?</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Tell us about your journey and we'll help you find a stay
                that fits the destination, experience, and pace you're
                looking for.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/inquiry"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
              >
                Plan my stay
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
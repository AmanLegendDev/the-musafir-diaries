import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export default function BlogCTA() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#071A33] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#1597C7]/20" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#F59E0B]/15" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#F59E0B]">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Your next chapter
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                Enough reading.
                <span className="block text-white/70">
                  It&apos;s time to go.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Let the stories inspire you, then turn that inspiration into a
                journey through the Himalayas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
              >
                <Compass className="h-4 w-4" />
                Explore destinations
              </Link>

              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15"
              >
                Plan my journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
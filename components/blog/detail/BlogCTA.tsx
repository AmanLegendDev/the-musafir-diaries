import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

type Props = {
  blogTitle?: string;
};

export default function BlogCTA({ blogTitle }: Props) {
  return (
    <section className="bg-[#FAF9F5] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#071A33] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#1597C7]/15" />
          <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-[#1597C7]/10" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#F59E0B]/15" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 text-[#F59E0B]">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              From inspiration to experience
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Some places are better
              <span className="block text-white/65">
                experienced than imagined.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Turn the stories you&apos;ve read into a journey of your own.
              Discover thoughtful Himalayan escapes with The Musafir Diaries.
            </p>

            {blogTitle && (
              <p className="mx-auto mt-5 max-w-xl truncate text-xs text-white/35">
                Inspired by: {blogTitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
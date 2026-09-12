import Link from "next/link";
import { ArrowLeft, Compass, Mountain } from "lucide-react";

export default function BlogNotFound() {
  return (
    <main className="min-h-[70vh] bg-[#FAF9F5]">
      <section className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#087E8B]/8 text-[#087E8B]">
          <Mountain className="h-7 w-7" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#087E8B]">
          Story not found
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#071A33] sm:text-5xl">
          This story has left the trail.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#071A33]/55 sm:text-lg sm:leading-8">
          The journal entry you&apos;re looking for may have been moved,
          unpublished, or may no longer be available.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journal
          </Link>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
          >
            <Compass className="h-4 w-4" />
            Explore destinations
          </Link>
        </div>
      </section>
    </main>
  );
}
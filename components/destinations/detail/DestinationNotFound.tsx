import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function DestinationNotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#071A33]">
      <section className="flex min-h-[75vh] items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/20 bg-white text-[#087E8B]">
            <Compass size={28} strokeWidth={1.5} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
            Destination not found
          </p>

          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            This trail doesn’t
            <span className="block text-[#087E8B]">
              seem to exist.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#071A33]/65">
            We couldn’t find the destination you’re looking for.
            Explore our destinations and discover a journey worth remembering.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full bg-[#071A33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
            >
              <ArrowLeft size={16} />
              Explore destinations
            </Link>

            <Link
              href="/"
              className="rounded-full border border-[#071A33]/15 bg-white px-6 py-3 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/40 hover:text-[#087E8B]"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Mountain,
} from "lucide-react";

export default function PackageNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF9F5] px-6 py-20">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#087E8B]/15 bg-[#087E8B]/5">
          <Mountain
            className="h-7 w-7 text-[#087E8B]"
            strokeWidth={1.4}
          />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
          Journey not found
        </p>

        <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-[#071A33] sm:text-6xl">
          This story seems to have taken another route.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
          The journey you’re looking for may no longer be
          available. Explore our other Himalayan journeys and
          find somewhere that feels right.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/packages"
            className="group inline-flex items-center gap-3 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#087E8B]"
          >
            Explore journeys

            <Compass
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={1.6}
            />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-6 py-3.5 text-sm font-medium text-[#071A33]/65 transition-colors hover:border-[#087E8B]/30 hover:text-[#087E8B]"
          >
            <ArrowLeft
              className="h-4 w-4"
              strokeWidth={1.6}
            />

            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
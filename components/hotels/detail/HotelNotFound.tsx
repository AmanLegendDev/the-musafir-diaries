import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mountain,
} from "lucide-react";

export default function HotelNotFound() {
  return (
    <main className="min-h-[70vh] bg-[#FAF9F5]">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-20 text-center sm:px-8">
        <div>
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071A33] text-white">
            <Mountain className="h-7 w-7" />
          </div>

          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
            Stay not found
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
            This stay seems to have
            <span className="block text-[#087E8B]">
              moved on.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#071A33]/50 sm:text-base">
            We couldn't find the hotel you're looking
            for. It may no longer be available or the
            link may have changed.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/hotels"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071A33] px-6 text-sm font-semibold text-white transition hover:bg-[#087E8B]"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore all stays
            </Link>

            <Link
              href="/destinations"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#071A33]/10 bg-white px-6 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
            >
              Explore destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
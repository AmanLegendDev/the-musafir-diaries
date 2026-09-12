import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  Mountain,
} from "lucide-react";

type Props = {
  hotelName: string;
  hotelSlug: string;
  destinationName: string;
};

export default function HotelCTA({
  hotelName,
  hotelSlug,
  destinationName,
}: Props) {
  return (
    <section className="bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-4 sm:px-8 lg:px-12 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#071A33] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/5" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-[#F59E0B]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  {destinationName} · Your stay
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                Found your place?
                <span className="block text-[#F59E0B]">
                  Let's plan the rest.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Interested in{" "}
                <span className="font-medium text-white/75">
                  {hotelName}
                </span>
                ? Tell us your travel dates, group
                size and preferences. We'll help you
                take the next step.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={`/inquiry?hotel=${encodeURIComponent(
                  hotelSlug
                )}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
              >
                <CalendarDays className="h-4 w-4" />
                Enquire about this stay
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
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
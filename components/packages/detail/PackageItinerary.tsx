import {
  ArrowDown,
  CalendarDays,
  Check,
} from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageItineraryProps {
  itinerary: ItineraryDay[];
}

export default function PackageItinerary({
  itinerary,
}: PackageItineraryProps) {
  if (!itinerary?.length) return null;

  return (
    <section
      id="itinerary"
      className="scroll-mt-24 bg-[#FAF9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                The journey
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-6xl">
              One day at a time.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              A thoughtfully paced itinerary that leaves room
              for both discovery and simply being there.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <CalendarDays
                className="h-4 w-4 text-[#F59E0B]"
                strokeWidth={1.6}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
                {itinerary.length} days planned
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-5 left-[20px] top-5 w-px bg-[#071A33]/10 sm:left-[24px]"
              />

              <div className="space-y-0">
                {itinerary.map((item, index) => (
                  <article
                    key={`${item.day}-${item.title}-${index}`}
                    className="group relative flex gap-5 border-b border-[#071A33]/8 py-7 first:pt-0 sm:gap-7 sm:py-9"
                  >
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#FAF9F5] sm:h-12 sm:w-12">
                      <span className="font-serif text-sm text-[#087E8B]">
                        {String(item.day).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <h3 className="font-serif text-2xl font-medium leading-tight tracking-[-0.02em] text-[#071A33] sm:text-3xl">
                          {item.title}
                        </h3>

                        <ArrowDown
                          className="mt-1 h-4 w-4 shrink-0 text-[#071A33]/20 transition-transform duration-300 group-hover:translate-y-1 group-hover:text-[#087E8B]"
                          strokeWidth={1.5}
                        />
                      </div>

                      {item.description && (
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-start gap-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#087E8B]"
                strokeWidth={1.7}
              />

              <p className="text-[10px] leading-5 text-[#071A33]/35">
                Itinerary details can be customised according to
                your travel dates, interests and local conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
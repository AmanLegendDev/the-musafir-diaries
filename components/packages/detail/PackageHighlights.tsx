import {
  Check,
  Compass,
  Sparkles,
} from "lucide-react";

interface PackageHighlightsProps {
  highlights: string[];
}

export default function PackageHighlights({
  highlights,
}: PackageHighlightsProps) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <section
      id="highlights"
      className="scroll-mt-24 border-y border-[#071A33]/8 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Heading */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#1597C7]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                What makes it special
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
              Moments worth travelling for.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#071A33]/50">
              A few of the experiences and details that shape
              this particular journey.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[#071A33]/30">
              <Sparkles
                className="h-4 w-4 text-[#F59E0B]"
                strokeWidth={1.5}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                Thoughtfully curated
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="lg:col-span-8">
            <div className="grid border-l border-t border-[#071A33]/8 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="group border-b border-r border-[#071A33]/8 p-6 transition-colors duration-300 hover:bg-[#FAF9F5] sm:p-8"
                >
                  <div className="flex items-start gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5">
                      <Check
                        className="h-4 w-4 text-[#087E8B]"
                        strokeWidth={1.8}
                      />
                    </span>

                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-3 text-base font-medium leading-7 text-[#071A33] transition-colors group-hover:text-[#087E8B]">
                        {highlight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Compass
                className="h-4 w-4 text-[#1597C7]"
                strokeWidth={1.6}
              />

              <p className="text-[10px] leading-5 text-[#071A33]/35">
                Experiences may vary slightly depending on weather,
                season and local conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
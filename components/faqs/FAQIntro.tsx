import { Compass, Mountain } from "lucide-react";

export default function FAQIntro() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Label */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
                Good to know
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl leading-[1.15] tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
              Less uncertainty.
              <span className="block text-[#087E8B]">
                More time to look forward.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#071A33]/55 sm:text-lg sm:leading-8">
              From choosing the right destination to understanding
              bookings, stays and trip planning, we have gathered
              the questions travellers ask most often.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#071A33]/8 bg-[#FAF9F5] p-5">
                <Mountain
                  className="h-5 w-5 text-[#087E8B]"
                  strokeWidth={1.6}
                />

                <p className="mt-4 text-sm font-semibold text-[#071A33]">
                  Journey planning
                </p>

                <p className="mt-2 text-sm leading-6 text-[#071A33]/45">
                  Understand destinations, itineraries and what
                  your trip can look like.
                </p>
              </div>

              <div className="rounded-2xl border border-[#071A33]/8 bg-[#FAF9F5] p-5">
                <Compass
                  className="h-5 w-5 text-[#F59E0B]"
                  strokeWidth={1.6}
                />

                <p className="mt-4 text-sm font-semibold text-[#071A33]">
                  Travel with clarity
                </p>

                <p className="mt-2 text-sm leading-6 text-[#071A33]/45">
                  Find useful answers before you take the first
                  step towards your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
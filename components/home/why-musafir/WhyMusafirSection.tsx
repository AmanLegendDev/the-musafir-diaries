import WhyMusafirHeader from "./WhyMusafirHeader";
import WhyMusafirGrid from "./WhyMusafirGrid";

export default function WhyMusafirSection() {
  return (
    <section
      id="why-musafir"
      className="relative overflow-hidden bg-[#071A33] py-20 text-white sm:py-24 lg:py-32"
    >
      {/* Ambient details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#087E8B]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Header / Intro */}
          <div className="lg:col-span-5">
            <WhyMusafirHeader />
          </div>

          {/* Reasons */}
          <div className="lg:col-span-7">
            <WhyMusafirGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
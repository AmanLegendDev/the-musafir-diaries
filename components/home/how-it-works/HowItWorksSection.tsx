import HowItWorksGrid from "./HowItWorksGrid";

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] py-24 sm:py-28 lg:py-32">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#087E8B]/[0.035] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
            How It Works
          </p>

          <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] text-[#071A33] sm:text-5xl lg:text-6xl">
            From an idea to a
            <span className="text-[#087E8B]">
              {" "}
              Himalayan journey.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/55 sm:text-base">
            Planning your journey with us is simple. Tell us what
            you have in mind, and we&apos;ll take care of the details
            that turn it into a memorable trip.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <HowItWorksGrid />
        </div>
      </div>
    </section>
  );
}
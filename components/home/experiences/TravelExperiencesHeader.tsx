
const EXPERIENCE_HEADER = {
  eyebrow: "Beyond the Destination",

  title: {
    lineOne: "Experiences that",
    lineTwo: "become part of the story.",
  },

  description:
    "Travel deeper through mountain adventures, quiet moments, local encounters and the little experiences that make a journey truly yours.",

  exploreLabel: "Discover experiences",

  exploreHref: "/under-development",
} as const;

export default function TravelExperiencesHeader() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#F59E0B] sm:w-12"
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7] sm:text-xs">
            {EXPERIENCE_HEADER.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="travel-experiences-heading"
          className="mt-5 max-w-3xl font-serif text-[42px] leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          {EXPERIENCE_HEADER.title.lineOne}
          <br />
          <span className="text-[#1597C7]">
            {EXPERIENCE_HEADER.title.lineTwo}
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
          {EXPERIENCE_HEADER.description}
        </p>
      </div>
    </div>
  );
}

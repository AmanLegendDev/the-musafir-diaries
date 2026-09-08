import TravelExperiencesHeader from "./TravelExperiencesHeader";
import TravelExperiencesGrid from "./TravelExperiencesGrid";

export default function TravelExperiencesSection() {
  return (
    <section
      id="experiences"
      aria-labelledby="travel-experiences-heading"
      className="relative overflow-hidden bg-[#071A33] py-24 sm:py-28 lg:py-36"
    >
      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#087E8B]/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#1597C7]/[0.05] blur-3xl"
      />

      {/* Editorial lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 h-px w-32 bg-[#F59E0B]/40 sm:w-48"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-0 h-px w-40 bg-[#087E8B]/40 sm:w-64"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <TravelExperiencesHeader />

        <div className="mt-14 lg:mt-16">
          <TravelExperiencesGrid />
        </div>
      </div>
    </section>
  );
}
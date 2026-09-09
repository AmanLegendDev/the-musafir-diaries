import HotelsStaysHeader from "./HotelsStaysHeader";
import HotelsStaysGrid, { type HomeHotel } from "./HotelsStaysGrid";

interface HotelsStaysSectionProps {
  hotels: HomeHotel[];
}

export default function HotelsStaysSection({
  hotels,
}: HotelsStaysSectionProps) {
  if (hotels.length === 0) return null;

  return (
    <section
      id="hotels"
      className="relative overflow-hidden bg-[#FAF9F5] py-20 sm:py-24 lg:py-32"
    >
      {/* Decorative atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <HotelsStaysHeader />

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <HotelsStaysGrid hotels={hotels} />
        </div>
      </div>
    </section>
  );
}
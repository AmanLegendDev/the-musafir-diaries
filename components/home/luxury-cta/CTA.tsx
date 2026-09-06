"use client";

import BackgroundOverlay from "./BackgroundOverlay";
import CTAButtons from "./CTAButtons";
import CTAContent from "./CTAContent";
import CTAStats from "./CTAStats";

const stats = [
  {
    value: "5K+",
    label: "Happy Travelers",
  },
  {
    value: "150+",
    label: "Luxury Tours",
  },
  {
    value: "25+",
    label: "Top Destinations",
  },
  {
    value: "4.9★",
    label: "Guest Rating",
  },
];

export default function CTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-28
        lg:py-36
      "
    >
      <BackgroundOverlay />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          lg:px-8
        "
      >
        <CTAContent
          badge="Luxury Himalayan Experiences"
          title="Your Next Adventure"
          highlightedText="Begins With Us"
          description="Discover handcrafted Himalayan journeys designed with comfort, authenticity, and unforgettable moments. Let our travel experts create an experience you'll cherish forever."
        />

        <CTAButtons
          primaryHref="/packages"
          secondaryHref="/contact"
        />

        <CTAStats
          stats={stats}
        />
      </div>
    </section>
  );
}
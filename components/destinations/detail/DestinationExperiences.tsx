import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Coffee,
  Compass,
  Heart,
  Mountain,
} from "lucide-react";

import type { Destination } from "@/lib/types/destination";

interface DestinationExperiencesProps {
  destination: Destination;
}

const experiences = [
  {
    number: "01",
    icon: Mountain,
    title: "Mountain adventures",
    description:
      "Take the scenic route, find the viewpoints and make space for the landscapes between the destinations.",
  },
  {
    number: "02",
    icon: Coffee,
    title: "Slow mountain moments",
    description:
      "Good coffee, quiet mornings, local streets and the simple pleasure of having nowhere to rush to.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Local encounters",
    description:
      "Look beyond the obvious and leave room for the people, places and small discoveries that shape a journey.",
  },
  {
    number: "04",
    icon: Camera,
    title: "Stories worth keeping",
    description:
      "Sunrise viewpoints, changing light and unexpected moments that become part of the memory.",
  },
];

export default function DestinationExperiences({
  destination,
}: DestinationExperiencesProps) {
  return (
    <section
      id="experiences"
      className="scroll-mt-24 overflow-hidden bg-[#071A33]"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        {/* Decorative lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-px w-48 bg-[#1597C7]/30"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full border border-[#1597C7]/10"
        />

        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Header */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1597C7]">
                Beyond the destination
              </span>
            </div>

            <h2 className="mt-6 max-w-xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#FAF9F5] sm:text-5xl lg:text-6xl">
              Come for the place.
              <span className="block text-[#1597C7]">
                Stay for the feeling.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              {destination.name} is more than a point on a map.
              Leave some room in the journey for the experiences
              that happen between the plans.
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs text-white/35">
              <Heart
                className="h-4 w-4 text-[#F59E0B]"
                strokeWidth={1.6}
              />

              <span>
                Explore · Experience · Belong
              </span>
            </div>
          </div>

          {/* Experience cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2">
              {experiences.map((experience) => {
                const Icon = experience.icon;

                return (
                  <article
                    key={experience.number}
                    className="group bg-[#071A33] p-6 transition-colors duration-300 hover:bg-[#0D2747] sm:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-white/25">
                        {experience.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#1597C7] transition-colors duration-300 group-hover:border-[#1597C7]/30 group-hover:bg-[#1597C7]/10">
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>

                    <h3 className="mt-9 font-serif text-2xl font-medium tracking-[-0.025em] text-white">
                      {experience.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      {experience.description}
                    </p>

                    <div className="mt-7 h-px w-8 bg-[#F59E0B] transition-all duration-300 group-hover:w-14" />
                  </article>
                );
              })}
            </div>

            <div className="mt-6">
              <Link
                href="/under-development"
                className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Explore travel experiences

                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
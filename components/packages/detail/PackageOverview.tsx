import {
  CalendarDays,
  Clock3,
  MapPin,
  Mountain,
  Users,
} from "lucide-react";

import type { IPackage } from "@/models/package.model";

interface RelatedEntity {
  _id?: string;
  name?: string;
  slug?: string;
  state?: string;
}

interface PackageOverviewProps {
  packageData: IPackage;
  destination: RelatedEntity | null;
  category: RelatedEntity | null;
}

const FACTS = [
  {
    key: "duration",
    label: "Duration",
    icon: Clock3,
  },
  {
    key: "groupSize",
    label: "Group size",
    icon: Users,
  },
];

export default function PackageOverview({
  packageData,
  destination,
  category,
}: PackageOverviewProps) {
  return (
    <section
      id="overview"
      className="scroll-mt-24 bg-[#FAF9F5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Intro */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                About the journey
              </span>
            </div>

            <h2 className="mt-6 max-w-4xl font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-6xl">
              A journey designed around the way you want to travel.
            </h2>

            {packageData.description ? (
              <div className="mt-7 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
                {packageData.description}
              </div>
            ) : packageData.shortDescription ? (
              <p className="mt-7 max-w-3xl text-sm leading-7 text-[#071A33]/60 sm:text-base sm:leading-8">
                {packageData.shortDescription}
              </p>
            ) : null}
          </div>

          {/* Facts */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[28px] border border-[#071A33]/8 bg-white">
              <div className="border-b border-[#071A33]/8 px-6 py-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#071A33]/35">
                  Journey details
                </p>
              </div>

              <div className="grid grid-cols-2">
                {FACTS.map((fact) => {
                  const Icon = fact.icon;
                  const value =
                    fact.key === "duration"
                      ? packageData.duration
                      : packageData.groupSize;

                  return (
                    <div
                      key={fact.key}
                      className="border-b border-r border-[#071A33]/8 p-6 last:border-r-0"
                    >
                      <Icon
                        className="h-5 w-5 text-[#087E8B]"
                        strokeWidth={1.5}
                      />

                      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/35">
                        {fact.label}
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#071A33]">
                        {value || "Flexible"}
                      </p>
                    </div>
                  );
                })}

                <div className="border-r border-[#071A33]/8 p-6">
                  <Mountain
                    className="h-5 w-5 text-[#087E8B]"
                    strokeWidth={1.5}
                  />

                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/35">
                    Difficulty
                  </p>

                  <p className="mt-2 text-sm font-medium capitalize text-[#071A33]">
                    {packageData.difficulty || "Easy"}
                  </p>
                </div>

                <div className="p-6">
                  <MapPin
                    className="h-5 w-5 text-[#087E8B]"
                    strokeWidth={1.5}
                  />

                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/35">
                    Destination
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#071A33]">
                    {destination?.name || "Himalayas"}
                  </p>
                </div>
              </div>

              {(category?.name || packageData.duration) && (
                <div className="flex items-center justify-between border-t border-[#071A33]/8 px-6 py-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      className="h-4 w-4 text-[#F59E0B]"
                      strokeWidth={1.6}
                    />

                    <span className="text-[10px] font-medium text-[#071A33]/50">
                      {category?.name || "Curated journey"}
                    </span>
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/30">
                    {packageData.difficulty}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
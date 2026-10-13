import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HERO_DESTINATIONS } from "./heroData";

export default function HeroDestinationRail() {
  return (
    <aside
      aria-label="Featured destinations"
      className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col gap-5">
        {HERO_DESTINATIONS.map((destination) => (
          <Link
            key={destination.name}
            href={destination.href}
            className="group flex items-center gap-3"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/50 shadow-lg">
              <Image
                src={destination.image}
                alt={`${destination.name} - ${destination.subtitle}`}
                width={56}
                height={56}
                sizes="56px"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-[#071A33]/10" />
            </div>

            <div className="min-w-[120px] border-l border-white/20 pl-3">
              <p className="text-sm font-semibold text-white">
                {destination.name}
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/50">
                {destination.subtitle}
              </p>
            </div>
          </Link>
        ))}

        <Link
          href="/destinations"
          className="group mt-2 flex items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF9F5] text-[#071A33] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            Explore More
          </span>
        </Link>
      </div>
    </aside>
  );
}
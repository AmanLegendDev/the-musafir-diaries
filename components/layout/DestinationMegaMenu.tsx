"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Mountain,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DESTINATION_PREVIEW = [
  {
    name: "Explore Destinations",
    description: "Discover places worth remembering.",
    href: "/destinations",
  },
  {
    name: "Himalayan Escapes",
    description: "Mountains, valleys and quiet stays.",
    href: "/destinations",
  },
  {
    name: "Curated Journeys",
    description: "Travel experiences designed with care.",
    href: "/packages",
  },
];

export default function DestinationMegaMenu({
  open,
  onClose,
}: Props) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        y: open ? 0 : -8,
        pointerEvents: open ? "auto" : "none",
      }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-[calc(100%+14px)] z-50 w-[min(760px,calc(100vw-32px))] -translate-x-1/2"
    >
      <div className="overflow-hidden rounded-[28px] border border-[#071A33]/10 bg-[#FAF9F5]/95 shadow-[0_30px_90px_rgba(7,26,51,0.16)] backdrop-blur-2xl">
        <div className="grid md:grid-cols-[1.05fr_1.4fr]">
          {/* Intro */}

          <div className="relative overflow-hidden bg-[#071A33] p-7 text-white sm:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-[#087E8B]/30" />

            <div className="relative">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Compass className="h-5 w-5 text-[#1597C7]" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                Discover
              </p>

              <h3 className="mt-3 max-w-xs font-serif text-3xl leading-tight">
                Places that become stories.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Explore carefully selected destinations and
                experiences across the Himalayas and beyond.
              </p>

              <Link
                href="/destinations"
                onClick={onClose}
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Explore all destinations
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Links */}

          <div className="p-5 sm:p-6">
            <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#071A33]/40">
              Start exploring
            </p>

            <div className="space-y-1">
              {DESTINATION_PREVIEW.map(
                (destination, index) => (
                  <Link
                    key={destination.name}
                    href={destination.href}
                    onClick={onClose}
                    className="group flex items-center gap-4 rounded-2xl p-3.5 transition-colors hover:bg-[#071A33]/[0.035]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                      {index === 0 ? (
                        <Compass className="h-4 w-4" />
                      ) : (
                        <Mountain className="h-4 w-4" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-[#071A33]">
                        {destination.name}
                      </span>

                      <span className="mt-0.5 block text-xs leading-5 text-[#071A33]/45">
                        {destination.description}
                      </span>
                    </span>

                    <ArrowRight className="h-4 w-4 text-[#071A33]/20 transition-all group-hover:translate-x-1 group-hover:text-[#087E8B]" />
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
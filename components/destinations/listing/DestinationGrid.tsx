"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Destination } from "@/lib/types/destination";

import DestinationCard from "./DestinationCard";
import DestinationEmpty from "./DestinationEmpty";

interface DestinationGridProps {
  destinations: Destination[];
  onClear?: () => void;
}

export default function DestinationGrid({
  destinations,
  onClear,
}: DestinationGridProps) {
  if (destinations.length === 0) {
    return <DestinationEmpty onClear={onClear} />;
  }

  return (
    <div
      id="destinations"
      className="scroll-mt-28"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid gap-5 lg:grid-cols-12"
        >
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
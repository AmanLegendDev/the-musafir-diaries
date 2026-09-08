"use client";

import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import type { HomeDestination } from "./DestinationsSection";

interface DestinationGridProps {
  destinations: HomeDestination[];
}

export default function DestinationGrid({
  destinations,
}: DestinationGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6"
    >
      {destinations.map((destination, index) => {
        /*
         * Only the first destination gets the
         * large editorial treatment.
         *
         * We intentionally don't use destination.featured
         * here for card sizing so the homepage composition
         * remains visually controlled.
         */
        const isFeatured = index === 0;

        return (
          <motion.div
            key={destination._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 28,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className={
              isFeatured
                ? "md:col-span-2 lg:col-span-7"
                : "md:col-span-1 lg:col-span-5"
            }
          >
            <DestinationCard
              destination={destination}
              featured={isFeatured}
              priority={index < 2}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
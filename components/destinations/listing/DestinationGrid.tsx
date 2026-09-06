"use client";

import { motion } from "framer-motion";

import DestinationCard from "./DestinationCard";
import DestinationEmpty from "./DestinationEmpty";

interface Destination {
  _id: string;
  slug: string;
  name: string;
  heroImage: string;
  shortDescription: string;
  city: string;
  state: string;
  bestTime: string;
  altitude: string;
  duration: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  startingPrice: number;
}

interface DestinationGridProps {
  destinations: Destination[];
}

export default function DestinationGrid({
  destinations,
}: DestinationGridProps) {
  if (destinations.length === 0) {
    return <DestinationEmpty />;
  }

  return (
    <motion.section
      id="destinations"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="
        mt-14
        grid
        gap-8
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {destinations.map((destination) => (
       <div key={destination._id}>
          <DestinationCard
            destination={destination}
          />
        </div>
      ))}
    </motion.section>
  );
}
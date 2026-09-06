import {
  ShieldCheck,
  Mountain,
  Gem,
  Headset,
  Wallet,
  Compass,
} from "lucide-react";

import type {
  FeatureData,
} from "./types";

export const features: FeatureData[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Trusted Travel Experts",
    description:
      "Experienced professionals dedicated to planning safe, reliable, and memorable Himalayan journeys.",
  },

  {
    id: 2,
    icon: Mountain,
    title: "Local Himalayan Specialists",
    description:
      "Discover authentic destinations with guidance from experts who know the mountains best.",
  },

  {
    id: 3,
    icon: Gem,
    title: "Luxury Accommodations",
    description:
      "Stay in carefully selected premium hotels and resorts offering comfort and breathtaking views.",
  },

  {
    id: 4,
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Our travel team is available whenever you need assistance before, during, or after your trip.",
  },

  {
    id: 5,
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Clear pricing with the best value for premium travel experiences.",
  },

  {
    id: 6,
    icon: Compass,
    title: "Curated Experiences",
    description:
      "Every itinerary is thoughtfully designed to create unforgettable memories across the Himalayas.",
  },
];
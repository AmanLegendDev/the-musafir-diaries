import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Hotel,
  MapPin,
} from "lucide-react";

export type HeroDestination = {
  name: string;
  subtitle: string;
  image: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroTrustItem = {
  label: string;
  href: string;
};

export type HeroSearchTab = {
  label: string;
  icon: LucideIcon;
};

export const HERO_CONTENT = {
  eyebrow: "Explore · Experience · Belong",

  title: {
    lineOne: "Journeys",
    lineTwo: "That Stay",
    highlight: "Forever",
  },

  description:
    "Discover the Himalayas with The Musafir Diaries — thoughtfully crafted journeys, beautiful stays, and experiences that become part of your story.",

 primaryCta: {
  label: "Plan Your Journey",
  href: "/inquiry",
},

secondaryCta: {
  label: "Book Your Trip",
  href: "/booking",
},

  storyLabel: "More than travel",
} as const;

export const HERO_STATS: HeroStat[] = [
  {
    value: "Himalayan",
    label: "Local Perspective",
  },
  {
    value: "Curated",
    label: "Travel Experiences",
  },
  {
    value: "Thoughtful",
    label: "Stays & Journeys",
  },
];

export const HERO_DESTINATIONS: HeroDestination[] = [
  {
    name: "Shimla",
    subtitle: "Colonial Charm",
    image: "/images/hero/shimla.webp",
    href: "/destinations/shimla",
  },
  {
    name: "Manali",
    subtitle: "Mountain Adventure",
    image: "/images/hero/manali.webp",
    href: "/destinations/manali",
  },
  {
    name: "Spiti",
    subtitle: "Untouched Beauty",
    image: "/images/hero/spiti.webp",
    href: "/hero/spiti",
  },
];

export const HERO_TRUST_ITEMS: HeroTrustItem[] = [
  {
    label: "Handpicked Destinations",
    href: "/destinations",
  },
  {
    label: "Thoughtful Stays",
    href: "/hotels",
  },
  {
    label: "Memorable Experiences",
    href: "/packages",
  },
];

export const HERO_SEARCH_TABS: HeroSearchTab[] = [
  {
    label: "Packages",
    icon: Compass,
  },
  {
    label: "Hotels",
    icon: Hotel,
  },
  {
    label: "Destinations",
    icon: MapPin,
  },
];

export const HERO_IMAGE = {
  src: "/images/hero/himalayan-hero.webp",
  alt: "Himalayan mountain landscape at sunrise",
} as const;
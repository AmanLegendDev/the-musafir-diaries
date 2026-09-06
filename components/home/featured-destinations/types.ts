export interface DestinationCardData {
  _id: string;

  name: string;

  slug: string;

  state: string;

  heroImage: string;

  shortDescription: string;

  startingPrice: number;

  duration: string;

  rating: number;

  reviewCount: number;

  featured: boolean;

  featuredOrder: number;
}

export interface DestinationBadgeProps {
  icon?: React.ReactNode;

  label: string;

  value: string | number;

  className?: string;
}

export interface DestinationCardProps {
  destination: DestinationCardData;

  priority?: boolean;

  large?: boolean;
}

export interface DestinationGridProps {
  destinations: DestinationCardData[];
}

export interface FeaturedDestinationsProps {
  destinations: DestinationCardData[];
}
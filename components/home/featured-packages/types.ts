export interface PackageCardData {
  _id: string;

  name: string;

  slug: string;

  destination: {
    _id: string;
    name: string;
  };

  heroImage: string;

  shortDescription: string;

  originalPrice: number;

  discountedPrice: number;

  duration: string;

  difficulty: string;

  groupSize: string;

  featured: boolean;
}

export interface PackageCardProps {
  packageData: PackageCardData;

  priority?: boolean;

  large?: boolean;
}

export interface PackageGridProps {
  packages: PackageCardData[];
}

export interface FeaturedPackagesProps {
  packages: PackageCardData[];
}
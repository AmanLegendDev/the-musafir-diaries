export type PackageStatus =
  | "active"
  | "inactive";

export type Difficulty =
  | "easy"
  | "moderate"
  | "difficult";





export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface ChildPolicy {
  complimentaryBelow: number;
  halfPriceBelow: number;
  halfPricePercentage: number;
}



export interface PackageCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface PackageDestination {
  _id: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  country: string;
}
export interface Package {
  _id: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: string;

 category: PackageCategory;

destination: PackageDestination;

  heroImage: string;
  gallery: string[];

  duration: string;

  difficulty: Difficulty;

  

  groupSize: string;

  originalPrice: number;
  discountedPrice: number;

  childPolicy: ChildPolicy;

  highlights: string[];

  included: string[];

  excluded: string[];

  itinerary: ItineraryDay[];

  seoTitle: string;
  seoDescription: string;

  featured: boolean;

  status: PackageStatus;

  createdAt: string;
  updatedAt: string;
}

export interface PackageFormData {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  category: string;

  destination: string;

  heroImage: string;
  gallery: string[];

  duration: string;

  difficulty: Difficulty;

  groupSize: string;

  originalPrice: number;
  discountedPrice: number;

  childPolicy: ChildPolicy;

  highlights: string[];

  included: string[];

  excluded: string[];

  itinerary: ItineraryDay[];

  seoTitle: string;
  seoDescription: string;

  featured: boolean;

  status: PackageStatus;
}

export interface PackageFilters {
  search: string;
  category: string;
  destination: string;
  featured: string;
  difficulty: string;
  sort: string;
}

export interface PackageQueryOptions {
  search?: string;

  category?: string;

  destination?: string;

  featured?: boolean;

  difficulty?: Difficulty;

  sort?: string;

  limit?: number;

  skip?: number;
}

export interface PackageActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
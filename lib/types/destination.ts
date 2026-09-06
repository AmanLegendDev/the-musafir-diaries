export type DestinationStatus = "active" | "draft";

export interface Destination {
  _id: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  country: string;
  state: string;
  city: string;

  bestTime: string;
  altitude: string;

  heroImage: string;
  gallery: string[];

  startingPrice: number;
  duration: string;

  rating: number;
  reviewCount: number;

  featured: boolean;
  featuredOrder: number;

  seoTitle: string;
  seoDescription: string;

  status: DestinationStatus;

  createdAt: string;
  updatedAt: string;
}

export interface DestinationFormData {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  country: string;
  state: string;
  city: string;

  bestTime: string;
  altitude: string;

  heroImage: string;
  gallery: string[];

  startingPrice: number;
  duration: string;

  rating: number;
  reviewCount: number;

  featured: boolean;
  featuredOrder: number;

  seoTitle: string;
  seoDescription: string;

  status: DestinationStatus;
}

export interface DestinationFilters {
  search: string;
  state: string;
  featured: string;
  sort: string;
}

export interface DestinationQueryOptions {
  featured?: boolean;
  state?: string;
  city?: string;
  search?: string;
  sort?: string;
  limit?: number;
  skip?: number;
}

export interface DestinationActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
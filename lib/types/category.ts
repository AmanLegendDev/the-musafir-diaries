// lib/types/category.ts

export type CategoryStatus = "active" | "draft";

export interface Category {
  _id: string;

  name: string;
  slug: string;

  description: string;

  heroImage: string;

  featured: boolean;
  featuredOrder: number;

  seoTitle: string;
  seoDescription: string;

  status: CategoryStatus;

  createdAt: string;
  updatedAt: string;
}
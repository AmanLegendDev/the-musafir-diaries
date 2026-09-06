export interface Category {
  _id: string;
  name: string;
  slug: string;

  description?: string;

  heroImage?: string;

  featured?: boolean;
}
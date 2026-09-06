export interface GalleryData {
  _id: string;

  title: string;

  description: string;

  image: string;

  category:
    | "hero"
    | "destination"
    | "package"
    | "blog"
    | "team"
    | "testimonial"
    | "office"
    | "customer"
    | "general";

  alt: string;

  featured: boolean;

  order: number;

  active: boolean;
}

export interface GalleryCardProps {
  image: GalleryData;

  index: number;
}

export interface GalleryGridProps {
  images: GalleryData[];
}

export interface GalleryProps {
  images: GalleryData[];
}
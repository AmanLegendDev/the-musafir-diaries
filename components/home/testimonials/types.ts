export interface TestimonialData {
  _id: string;

  name: string;

  designation: string;

  location: string;

  image: string;

  rating: number;

  review: string;

  trip: string;

  featured: boolean;

  order: number;

  active: boolean;
}

export interface RatingStarsProps {
  rating: number;
}

export interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export interface TestimonialGridProps {
  testimonials: TestimonialData[];
}

export interface TestimonialsProps {
  testimonials: TestimonialData[];
}
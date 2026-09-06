import TestimonialCard from "./TestimonialCard";

import type {
  TestimonialGridProps,
} from "./types";

export default function TestimonialGrid({
  testimonials,
}: TestimonialGridProps) {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial._id}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}
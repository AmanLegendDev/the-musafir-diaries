import Image from "next/image";
import { MapPin, Quote, Star } from "lucide-react";

export type FeaturedTestimonial = {
  _id: string;
  name: string;
  designation?: string;
  location?: string;
  image: string;
  rating: number;
  review: string;
  trip?: string;
};

type Props = {
  testimonials: FeaturedTestimonial[];
};

function renderStars(rating: number) {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating)));

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < safeRating
          ? "fill-[#F59E0B] text-[#F59E0B]"
          : "text-[#071A33]/15"
      }`}
    />
  ));
}

export default function FeaturedTestimonials({
  testimonials,
}: Props) {
  const items = testimonials.filter(
    (testimonial) =>
      testimonial.image &&
      testimonial.review &&
      testimonial.name
  );

  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
            Featured experiences
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#071A33] sm:text-4xl">
            Stories worth remembering.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {items.slice(0, 4).map((testimonial, index) => (
            <article
              key={testimonial._id}
              className={`group relative overflow-hidden rounded-[2rem] bg-[#FAF9F5] ${
                index === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <div
                className={`grid h-full ${
                  index === 0
                    ? "lg:grid-rows-[minmax(300px,1fr)_auto]"
                    : "sm:grid-cols-[180px_1fr]"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "min-h-[340px] lg:min-h-[420px]"
                      : "min-h-[220px] sm:min-h-full"
                  }`}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 100vw, 180px"
                    }
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/35 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#087E8B] shadow-lg backdrop-blur-sm">
                    <Quote className="h-4 w-4 fill-current" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center ${
                    index === 0
                      ? "p-7 sm:p-9"
                      : "p-6 sm:p-7"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>

                  <blockquote
                    className={`mt-5 font-medium leading-[1.45] tracking-[-0.02em] text-[#071A33] ${
                      index === 0
                        ? "text-2xl sm:text-3xl"
                        : "text-xl"
                    }`}
                  >
                    “{testimonial.review}”
                  </blockquote>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#071A33]">
                        {testimonial.name}
                      </p>

                      {(testimonial.designation ||
                        testimonial.location) && (
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#071A33]/45">
                          {testimonial.designation && (
                            <span>
                              {testimonial.designation}
                            </span>
                          )}

                          {testimonial.designation &&
                            testimonial.location && (
                              <span className="text-[#071A33]/20">
                                •
                              </span>
                            )}

                          {testimonial.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {testimonial.location}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {testimonial.trip && (
                    <div className="mt-6 border-t border-[#071A33]/8 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087E8B]">
                        Journey
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#071A33]/70">
                        {testimonial.trip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
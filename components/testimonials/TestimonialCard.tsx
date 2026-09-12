import Image from "next/image";
import { MapPin, Star } from "lucide-react";

export type TestimonialData = {
  _id: string;
  name: string;
  designation?: string;
  location?: string;
  image: string;
  rating: number;
  review: string;
  trip?: string;
  featured?: boolean;
  order?: number;
  active?: boolean;
};

type Props = {
  testimonial: TestimonialData;
};

function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < safeRating
              ? "fill-[#F59E0B] text-[#F59E0B]"
              : "text-[#071A33]/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({
  testimonial,
}: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(7,26,51,0.09)]">
      {/* Guest image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#071A33]/5">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/35 via-transparent to-transparent" />

        {testimonial.featured && (
          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#071A33]/40 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
            Featured story
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <StarRating rating={testimonial.rating} />

        <blockquote className="mt-5 flex-1 text-[17px] font-medium leading-7 tracking-[-0.015em] text-[#071A33]">
          “{testimonial.review}”
        </blockquote>

        {/* Guest */}
        <div className="mt-7 border-t border-[#071A33]/8 pt-5">
          <p className="text-sm font-semibold text-[#071A33]">
            {testimonial.name}
          </p>

          {(testimonial.designation || testimonial.location) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#071A33]/45">
              {testimonial.designation && (
                <span>{testimonial.designation}</span>
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

          {testimonial.trip && (
            <div className="mt-4 inline-flex max-w-full rounded-full bg-[#FAF9F5] px-3.5 py-2">
              <span className="truncate text-xs font-medium text-[#087E8B]">
                {testimonial.trip}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
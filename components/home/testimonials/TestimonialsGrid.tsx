"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import type { HomeTestimonial } from "./TestimonialsSection";

interface TestimonialsGridProps {
  testimonials: HomeTestimonial[];
}

export default function TestimonialsGrid({
  testimonials,
}: TestimonialsGridProps) {
  const visibleTestimonials = testimonials
    .filter((item) => item.active && item.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  if (visibleTestimonials.length === 0) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {visibleTestimonials.map((testimonial, index) => (
        <motion.article
          key={testimonial._id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.65,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative flex min-h-[390px] flex-col border border-[#071A33]/10 bg-white p-6 sm:p-7 lg:p-8"
        >
          <div className="flex items-start justify-between">
            <Quote
              size={30}
              strokeWidth={1.3}
              className="text-[#087E8B]/30"
            />

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={13}
                  strokeWidth={1.5}
                  fill={
                    starIndex < testimonial.rating
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    starIndex < testimonial.rating
                      ? "text-[#F59E0B]"
                      : "text-[#071A33]/15"
                  }
                />
              ))}
            </div>
          </div>

          <p className="mt-8 flex-1 font-serif text-xl leading-8 text-[#071A33] sm:text-[22px]">
            “{testimonial.review}”
          </p>

          {testimonial.trip && (
            <div className="mb-6 border-l-2 border-[#F59E0B] pl-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]">
                Journey
              </p>

              <p className="mt-1 text-sm text-[#071A33]/65">
                {testimonial.trip}
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 border-t border-[#071A33]/10 pt-5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#071A33]/5">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-[#071A33]">
                {testimonial.name}
              </h3>

              {(testimonial.designation ||
                testimonial.location) && (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#071A33]/50">
                  {testimonial.designation && (
                    <span>{testimonial.designation}</span>
                  )}

                  {testimonial.designation &&
                    testimonial.location && (
                      <span>•</span>
                    )}

                  {testimonial.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} />
                      {testimonial.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#F59E0B] transition-all duration-500 group-hover:w-full" />
        </motion.article>
      ))}
    </div>
  );
}
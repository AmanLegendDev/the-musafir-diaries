"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Mountain,
  UtensilsCrossed,
} from "lucide-react";

const EXPERIENCES = [
  {
    number: "01",
    title: "Mountain Adventures",
    description:
      "Feel the mountains beyond the viewpoint — through open roads, high valleys and moments that invite you to go a little further.",
    image: "/images/experiences/mountain-adventures.webp",
    icon: Mountain,
    href: "/under-development",
    featured: true,
  },
  {
    number: "02",
    title: "Slow Mountain Moments",
    description:
      "Quiet mornings, forest walks, peaceful viewpoints and the simple pleasure of having nowhere else to be.",
    image: "/images/experiences/slow-mountain-moments.webp",
    icon: Compass,
    href: "/under-development",
    featured: false,
  },
  {
    number: "03",
    title: "Local Flavours & Culture",
    description:
      "Discover the character of the mountains through local flavours, traditions, stories and places that feel wonderfully unhurried.",
    image: "/images/experiences/local-flavours-culture.webp",
    icon: UtensilsCrossed,
    href: "/under-development",
    featured: false,
  },
] as const;

export default function TravelExperiencesGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Featured Experience */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-100px",
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="lg:col-span-7"
      >
        <ExperienceCard
          experience={EXPERIENCES[0]}
          featured
        />
      </motion.div>

      {/* Secondary Experiences */}
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
        {EXPERIENCES.slice(1).map((experience, index) => (
          <motion.div
            key={experience.number}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.75,
              delay: (index + 1) * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-h-[300px]"
          >
            <ExperienceCard experience={experience} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ExperienceCardProps {
  experience: (typeof EXPERIENCES)[number];
  featured?: boolean;
}

function ExperienceCard({
  experience,
  featured = false,
}: ExperienceCardProps) {
  const Icon = experience.icon;

  return (
    <Link
      href={experience.href}
      aria-label={`Explore ${experience.title}`}
      className="group block h-full"
    >
      <article
        className={[
          "relative isolate h-full min-h-[300px] overflow-hidden rounded-[28px] bg-[#0D2747]",
          "shadow-[0_20px_60px_rgba(0,0,0,0.16)]",
          featured
            ? "min-h-[540px] sm:min-h-[580px] lg:min-h-[620px]"
            : "lg:min-h-[296px]",
        ].join(" ")}
      >
        {/* Image */}
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          priority={featured}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Cinematic overlay */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 transition-opacity duration-500",
            featured
              ? "bg-gradient-to-t from-[#071A33] via-[#071A33]/45 to-[#071A33]/5"
              : "bg-gradient-to-t from-[#071A33] via-[#071A33]/55 to-transparent",
            "group-hover:opacity-95",
          ].join(" ")}
        />

        {/* Top accent */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 h-px w-10 bg-[#F59E0B] transition-all duration-500 group-hover:w-16"
        />

        {/* Number */}
        <span className="absolute right-6 top-5 font-serif text-sm text-white/45">
          {experience.number}
        </span>

        {/* Icon */}
        <div
          className={[
            "absolute flex items-center justify-center rounded-full border border-white/15 bg-[#071A33]/30 text-white/80 backdrop-blur-md transition-all duration-500",
            featured
              ? "left-6 top-16 h-11 w-11 sm:left-8 sm:top-16"
              : "left-6 top-16 h-10 w-10",
            "group-hover:border-[#087E8B]/70 group-hover:bg-[#087E8B]",
            "group-hover:text-white",
          ].join(" ")}
        >
          <Icon
            className={
              featured
                ? "h-5 w-5"
                : "h-4 w-4"
            }
          />
        </div>

        {/* Content */}
        <div
          className={[
            "absolute inset-x-0 bottom-0",
            featured
              ? "p-6 sm:p-8 lg:p-9"
              : "p-5 sm:p-6",
          ].join(" ")}
        >
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1597C7]">
            Himalayan Experience
          </p>

          <h3
            className={[
              "max-w-2xl font-serif leading-[0.96] tracking-[-0.025em] text-white",
              featured
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-2xl sm:text-3xl",
            ].join(" ")}
          >
            {experience.title}
          </h3>

          <p
            className={[
              "mt-4 leading-6 text-white/65",
              featured
                ? "max-w-xl text-sm sm:text-base"
                : "line-clamp-2 max-w-lg text-xs sm:text-sm",
            ].join(" ")}
          >
            {experience.description}
          </p>

          {/* Bottom action */}
          <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
              Explore the experience
            </span>

            <span
              aria-hidden="true"
              className={[
                "flex shrink-0 items-center justify-center rounded-full bg-[#FAF9F5] text-[#071A33]",
                "transition-all duration-500",
                "group-hover:rotate-45 group-hover:bg-[#087E8B] group-hover:text-white",
                featured
                  ? "h-12 w-12"
                  : "h-10 w-10",
              ].join(" ")}
            >
              <ArrowUpRight
                className={
                  featured
                    ? "h-5 w-5"
                    : "h-4 w-4"
                }
              />
            </span>
          </div>
        </div>

        {/* Hover border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/0 transition-colors duration-500 group-hover:border-white/20"
        />
      </article>
    </Link>
  );
}
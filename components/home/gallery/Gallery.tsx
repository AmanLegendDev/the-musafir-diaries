"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { Images } from "lucide-react";

import GalleryGrid from "./GalleryGrid";

import type {
  GalleryProps,
} from "./types";

export default function Gallery({
  images,
}: GalleryProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
      "
    >
      {/* Background Decorations */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-sky-200
              bg-sky-50
              px-4
              py-2
              text-sm
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#0F4C81]
            "
          >
            <Images size={16} />

            Captured Moments
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-slate-900

              md:text-5xl
            "
          >
            Experience The Himalayas
            <span className="block text-[#0F4C81]">
              Through Every Frame
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            Every photograph tells a story of breathtaking landscapes,
            unforgettable adventures, luxurious stays, and moments that
            make every Himalayan journey truly extraordinary.
          </p>
        </motion.div>

        <div className="mt-20">
                      {images.length > 0 ? (
            <>
              <GalleryGrid
                images={images}
              />

              <div className="mt-16 flex justify-center">
                <Link
                  href="/gallery"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#0F4C81]
                    px-8
                    py-4
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#0c3d67]
                    hover:shadow-xl
                  "
                >
                  View Full Gallery

                  <motion.span
                    whileHover={{
                      x: 5,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </>
          ) : (
            <div
              className="
                rounded-[30px]
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-8
                py-16
                text-center
              "
            >
              <Images
                size={56}
                className="
                  mx-auto
                  text-slate-400
                "
              />

              <h3
                className="
                  mt-6
                  text-2xl
                  font-semibold
                  text-slate-900
                "
              >
                Gallery Coming Soon
              </h3>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-slate-600
                "
              >
                We're curating breathtaking moments from our Himalayan
                journeys. Check back soon to explore stunning travel
                photography and unforgettable experiences.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
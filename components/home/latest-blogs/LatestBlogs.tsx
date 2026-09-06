"use client";

import { motion } from "framer-motion";

import BlogGrid from "./BlogGrid";

import type {
  LatestBlogsProps,
} from "./types";

export default function LatestBlogs({
  blogs,
}: LatestBlogsProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        py-24
        lg:py-32
      "
    >
      {/* Background Decoration */}

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
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              items-center
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
            Travel Insights
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
            Discover Stories,
            <span className="block text-[#0F4C81]">
              Travel Smarter
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
            Explore expert travel guides, destination highlights,
            insider tips, and inspiring stories to help you plan your
            next unforgettable Himalayan adventure.
          </p>
        </motion.div>

        <div className="mt-20">

                      {blogs.length > 0 ? (
            <>
              <BlogGrid
                blogs={blogs}
              />

              <div className="mt-16 flex justify-center">
                <a
                  href="/blogs"
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
                    transition-all
                    duration-300
                    hover:bg-[#0c3d67]
                    hover:shadow-lg
                  "
                >
                  View All Articles

                  <span
                    className="
                      text-xl
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </a>
              </div>
            </>
          ) : (
            <div
              className="
                rounded-[30px]
                border
                border-dashed
                border-slate-300
                bg-white
                px-8
                py-16
                text-center
              "
            >
              <h3
                className="
                  text-2xl
                  font-semibold
                  text-slate-900
                "
              >
                Travel Stories Coming Soon
              </h3>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-slate-600
                "
              >
                We're preparing inspiring travel guides, destination
                tips, and adventure stories to help you plan your next
                unforgettable journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
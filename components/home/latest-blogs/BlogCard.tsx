"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import type {
  BlogCardProps,
} from "./types";

export default function BlogCard({
  blog,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200/70
        bg-white
        shadow-[0_18px_55px_rgba(15,23,42,.06)]
        transition-all
        duration-300
        hover:border-[#3BAEA0]/40
        hover:shadow-[0_24px_70px_rgba(15,76,129,.12)]
      "
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div className="relative h-72 overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/10
              to-transparent
            "
          />

          {/* Category Badge */}

          <div className="absolute left-6 top-6">
            <span
              className="
                rounded-full
                bg-white/95
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#0F4C81]
                backdrop-blur
              "
            >
              {blog.category.name}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-5
              text-sm
              text-slate-500
            "
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />

              <span>
                {new Date(
                  blog.publishedAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />

              <span>
                {blog.readTime} min read
              </span>
            </div>
          </div>

          <h3
            className="
              mt-6
              text-2xl
              font-bold
              leading-tight
              text-slate-900
              transition-colors
              duration-300
              group-hover:text-[#0F4C81]
            "
          >
            {blog.title}
          </h3>

          <p
            className="
              mt-4
              line-clamp-3
              text-[15px]
              leading-7
              text-slate-600
            "
          >
            {blog.excerpt}
          </p>

          <div className="mt-8">

                        <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  Written By
                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                    text-slate-900
                  "
                >
                  {blog.author}
                </p>
              </div>

              <motion.span
                whileHover={{
                  x: 6,
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-[#0F4C81]
                "
              >
                Read Article

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
              </motion.span>
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom Accent Line */}

      <motion.div
        initial={{
          width: "0%",
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          h-1
          bg-gradient-to-r
          from-[#0F4C81]
          to-[#3BAEA0]
        "
      />
    </motion.article>
  );
}
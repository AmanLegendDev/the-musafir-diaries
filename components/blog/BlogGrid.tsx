"use client"
import { motion } from "framer-motion";

import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    readTime: number;
    publishedAt: string;
    category: {
      name: string;
    };

  }[];
}

export default function BlogGrid({
  blogs,
}: BlogGridProps) {
  return (
    <section
      id="articles"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Heading */}

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
            duration: 0.5,
          }}
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>

            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

              Latest Stories

            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">

              Explore Our
              <span className="text-emerald-600">
                {" "}Travel Journal
              </span>

            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">

              Discover destination guides, luxury travel tips,
              hidden gems and unforgettable Himalayan experiences
              written by travel experts.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

            <p className="text-sm text-slate-500">

              Total Articles

            </p>

            <p className="mt-1 text-3xl font-bold text-emerald-600">

              {blogs.length}

            </p>

          </div>

        </motion.div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {blogs.map((blog, index) => (

            <motion.div
              key={blog._id}
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
                delay: index * 0.08,
                duration: 0.45,
              }}
            >

              <BlogCard blog={blog} />

            </motion.div>

          ))}

        </div>

        {/* Empty State */}

        {blogs.length === 0 && (

          <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center">

            <h3 className="text-2xl font-bold text-slate-800">

              No Articles Found

            </h3>

            <p className="mt-3 text-slate-500">

              New travel stories are coming soon.

            </p>

          </div>

        )}

      </div>
    </section>
  );
}
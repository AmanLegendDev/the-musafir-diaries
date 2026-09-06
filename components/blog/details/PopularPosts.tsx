"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, TrendingUp } from "lucide-react";

interface PopularPost {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  readTime: number;
  publishedAt: string;
}

interface PopularPostsProps {
  posts: PopularPost[];
}

export default function PopularPosts({
  posts,
}: PopularPostsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-emerald-100 p-3">

          <TrendingUp className="h-5 w-5 text-emerald-600" />

        </div>

        <div>

          <h3 className="text-lg font-bold text-slate-900">
            Popular Articles
          </h3>

          <p className="text-sm text-slate-500">
            Readers' favorites
          </p>

        </div>

      </div>

      {/* Posts */}

      <div className="space-y-5">

        {posts.map((post, index) => (

          <motion.div
            key={post._id}
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.08,
            }}
          >

            <Link
              href={`/blog/${post.slug}`}
              className="group flex gap-4"
            >

              {/* Thumbnail */}

              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">

                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col justify-between">

                <h4 className="line-clamp-2 font-semibold leading-6 text-slate-900 transition group-hover:text-emerald-600">

                  {post.title}

                </h4>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                  <span className="flex items-center gap-1">

                    <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />

                    {new Date(post.publishedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}

                  </span>

                  <span className="flex items-center gap-1">

                    <Clock3 className="h-3.5 w-3.5 text-emerald-600" />

                    {post.readTime} min

                  </span>

                </div>

              </div>

            </Link>

            {index !== posts.length - 1 && (
              <div className="mt-5 border-b border-slate-100" />
            )}

          </motion.div>

        ))}

      </div>

    </div>
  );
}
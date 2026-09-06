
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface BlogCardProps {
  blog: {
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
  };
}
export default function BlogCard({
  blog,
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl"
    >
      {/* Image */}

      <Link
        href={`/blog/${blog.slug}`}
        className="block"
      >
        <div className="relative h-72 overflow-hidden">

          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Category */}

          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-900 backdrop-blur">

            {blog.category.name}

          </span>

        </div>
      </Link>

      {/* Content */}

      <div className="p-7">

        {/* Meta */}

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">

          <div className="flex items-center gap-2">

            <CalendarDays className="h-4 w-4 text-emerald-600" />

            {new Date(blog.publishedAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}

          </div>

          <div className="flex items-center gap-2">

            <Clock3 className="h-4 w-4 text-emerald-600" />

            {blog.readTime} min read

          </div>

        </div>

        {/* Title */}

        <Link href={`/blog/${blog.slug}`}>

          <h3 className="mt-5 line-clamp-2 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-emerald-600">

            {blog.title}

          </h3>

        </Link>

        {/* Excerpt */}

        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-600">

          {blog.excerpt}

        </p>

        {/* CTA */}

        <div className="mt-8 flex items-center justify-between">

          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition group-hover:gap-3"
          >

            Read Article

            <ArrowRight className="h-4 w-4" />

          </Link>

        </div>

      </div>
    </motion.article>
  );
}
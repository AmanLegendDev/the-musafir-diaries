"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, User2 } from "lucide-react";

interface ArticleHeroProps {
  article: {
    title: string;
    excerpt: string;
    featuredImage: string;
    publishedAt: string;
    readTime: number;
    author: string;
    category: {
      name: string;
    };
  };
}

export default function ArticleHero({
  article,
}: ArticleHeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[650px] overflow-hidden">
      {/* Background Image */}

      <Image
        src={article.featuredImage}
        alt={article.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />

      {/* Content */}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-4xl"
        >
          {/* Category */}

          <span className="inline-flex rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            {article.category.name}
          </span>

          {/* Title */}

          <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            {article.title}
          </h1>

          {/* Excerpt */}

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            {article.excerpt}
          </p>

          {/* Meta */}

          <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-200">

            <div className="flex items-center gap-2">
              <User2 className="h-5 w-5 text-emerald-400" />
              <span>{article.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-400" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-emerald-400" />
              <span>{article.readTime} min read</span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
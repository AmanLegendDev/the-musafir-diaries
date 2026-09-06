"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface FeaturedArticleProps {
  article: {
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

export default function FeaturedArticle({
  article,
}: FeaturedArticleProps) {
  return (
    <section className="py-20">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Editor's Pick
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Featured Story
            </h2>

          </div>

        </div>

        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:shadow-2xl"
        >

          <div className="grid lg:grid-cols-2">

            {/* Image */}

            <div className="relative h-[380px] lg:h-[560px] overflow-hidden">

              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <span className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur">

                {article.category.name}

              </span>

            </div>

            {/* Content */}

            <div className="flex flex-col justify-center p-10 lg:p-14">

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">

                <div className="flex items-center gap-2">

                  <CalendarDays className="h-4 w-4 text-emerald-600" />

                  {new Date(article.publishedAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}

                </div>

                <div className="flex items-center gap-2">

                  <Clock3 className="h-4 w-4 text-emerald-600" />

                  {article.readTime} min read

                </div>

              </div>

              <h3 className="mt-6 text-4xl font-bold leading-tight text-slate-900">

                {article.title}

              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">

                {article.excerpt}

              </p>

              <div className="mt-10">

                <Link
                  href={`/blogs/${article.slug}`}
                  className="inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
                >

                  Read Full Story

                  <ArrowRight className="h-5 w-5" />

                </Link>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}
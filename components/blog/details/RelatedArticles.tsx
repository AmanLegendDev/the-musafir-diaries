"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface RelatedArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  readTime: number;
  category: {
    name: string;
  };
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({
  articles,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Keep Exploring
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Related Articles
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Continue your journey with more destination guides,
            travel inspiration and luxury experiences.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {articles.map((article, index) => (

            <motion.div
              key={article._id}
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
              }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}

              <Link href={`/blog/${article.slug}`}>

                <div className="relative h-64 overflow-hidden">

                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">

                    {article.category.name}

                  </span>

                </div>

              </Link>

              {/* Content */}

              <div className="p-6">

                <div className="flex flex-wrap gap-5 text-sm text-slate-500">

                  <span className="flex items-center gap-2">

                    <CalendarDays className="h-4 w-4 text-emerald-600" />

                    {new Date(article.publishedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                  </span>

                  <span className="flex items-center gap-2">

                    <Clock3 className="h-4 w-4 text-emerald-600" />

                    {article.readTime} min read

                  </span>

                </div>

                <h3 className="mt-5 line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-emerald-600">

                  {article.title}

                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-slate-600">

                  {article.excerpt}

                </p>

                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-emerald-600 transition group-hover:gap-3"
                >

                  Read Article

                  <ArrowRight className="h-4 w-4" />

                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
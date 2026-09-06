"use client";

import { motion } from "framer-motion";
import { Compass, Mountain, MapPinned, Camera, Tent, Plane } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface BlogCategoriesProps {
  categories: Category[];
  activeCategory?: string;
}

const icons = [
  Compass,
  Mountain,
  MapPinned,
  Camera,
  Tent,
  Plane,
];

export default function BlogCategories({
  categories,
  activeCategory = "all",
}: BlogCategoriesProps) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Browse by Category
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Find Your Next Adventure
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Explore travel stories, destination guides and luxury experiences
            curated for every kind of traveller.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">

          {/* All */}

          <motion.button
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`rounded-2xl border px-6 py-4 transition-all duration-300 ${
              activeCategory === "all"
                ? "border-emerald-600 bg-emerald-600 text-white shadow-lg"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md"
            }`}
          >
            All Articles
          </motion.button>

          {categories.map((category, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.button
                key={category._id}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-3 rounded-2xl border px-6 py-4 transition-all duration-300 ${
                  activeCategory === category.slug
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span className="font-medium">
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
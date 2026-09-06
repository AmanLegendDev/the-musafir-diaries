"use client";

import { motion } from "framer-motion";
import { Images } from "lucide-react";

const categories = [
  { label: "All", value: "all" },
  { label: "Hero", value: "hero" },
  { label: "Destinations", value: "destination" },
  { label: "Packages", value: "package" },
  { label: "Blogs", value: "blog" },
  { label: "Team", value: "team" },
  { label: "Testimonials", value: "testimonial" },
  { label: "Office", value: "office" },
  { label: "Customers", value: "customer" },
  { label: "General", value: "general" },
];

interface GalleryCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GalleryCategories({
  activeCategory,
  onCategoryChange,
}: GalleryCategoriesProps) {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-10 text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">

            <Images className="h-4 w-4" />

            Browse Collections

          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
            Explore by Category
          </h2>

          <p className="mt-3 text-slate-600">
            Choose a collection to view the moments that matter most.
          </p>

        </div>

        <div className="flex flex-wrap justify-center gap-4">

          {categories.map((category) => {
            const active = activeCategory === category.value;

            return (
              <motion.button
                key={category.value}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -2 }}
                onClick={() => onCategoryChange(category.value)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                {category.label}
              </motion.button>
            );
          })}

        </div>

      </div>
    </section>
  );
}
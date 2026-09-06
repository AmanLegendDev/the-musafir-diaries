"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface PackageSearchProps {
  value?: string;
  onSearch?: (value: string) => void;
}

export default function PackageSearch({
  value = "",
  onSearch,
}: PackageSearchProps) {
  const [search, setSearch] = useState(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearch(value);

    onSearch?.(value);
    console.log("Typing:", value);
  };

  const clearSearch = () => {
    setSearch("");

    onSearch?.("");
  };

  return (
    <section
  className="
    sticky
    top-20
    z-30

    -mt-12

    px-6

    bg-white/90
    backdrop-blur-md

    pb-4
  "
>
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="flex items-center gap-3">
           <motion.div
  animate={{
    scale: search ? 1.1 : 1,
    rotate: search ? 8 : 0,
  }}
  transition={{
    duration: 0.2,
  }}
  className="
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-xl
    bg-emerald-100
  "
>
  <Search
    className={`h-5 w-5 ${
      search
        ? "text-emerald-700"
        : "text-emerald-600"
    }`}
  />
</motion.div>

            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={handleChange}
               placeholder={
  search
    ? "Searching packages..."
    : "Search by package, destination, adventure..."
}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-700 outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              className="hidden rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 md:block"
            >
              Search
            </button>
          </div>

         
        </div>
      </div>
    </section>  
  );
}
"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbProps {
  destination: string;
}

export default function Breadcrumb({
  destination,
}: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      aria-label="Breadcrumb"
      className="border-b border-slate-200 bg-white"
    >
      <div className="container mx-auto px-4 py-4 lg:px-8">

        <ol className="flex flex-wrap items-center gap-2 text-sm">

          <li>
            <Link
              href="/"
              className="
                flex
                items-center
                gap-2
                text-slate-500
                transition-colors
                duration-300
                hover:text-emerald-600
              "
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </li>

          <ChevronRight className="h-4 w-4 text-slate-400" />

          <li>
            <Link
              href="/destinations"
              className="
                text-slate-500
                transition-colors
                duration-300
                hover:text-emerald-600
              "
            >
              Destinations
            </Link>
          </li>

          <ChevronRight className="h-4 w-4 text-slate-400" />

          <li
            className="
              max-w-[180px]
              truncate
              font-semibold
              text-slate-900
              sm:max-w-none
            "
            aria-current="page"
          >
            {destination}
          </li>

        </ol>

      </div>
    </motion.nav>
  );
}
"use client";

import { motion } from "framer-motion";
import FeaturedPackageCard from "./FeaturedPackageCard";

export interface HomePackage {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;

  destination?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | null;

  heroImage: string;
  gallery?: string[];

  duration: string;
  difficulty?: "easy" | "moderate" | "difficult";
  groupSize?: string;

  originalPrice: number;
  discountedPrice: number;

  highlights?: string[];

  featured: boolean;
  status: "active" | "inactive";

  seoTitle?: string;
  seoDescription?: string;
}

interface FeaturedPackagesGridProps {
  packages: HomePackage[];
}

export default function FeaturedPackagesGrid({
  packages,
}: FeaturedPackagesGridProps) {
  const visiblePackages = packages
    .filter(
      (pkg) =>
        pkg.status === "active" &&
        pkg.featured === true
    )
    .slice(0, 3);

  if (visiblePackages.length === 0) {
    return null;
  }

  const featuredPackage = visiblePackages[0];
  const secondaryPackages = visiblePackages.slice(1);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="grid gap-5 lg:grid-cols-12 lg:gap-6"
    >
      {/* ─────────────────────────────────────
          FEATURED PACKAGE
      ───────────────────────────────────── */}

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className="lg:col-span-7"
      >
        <FeaturedPackageCard
          packageData={featuredPackage}
          featured
          priority
          position={1}
        />
      </motion.div>

      {/* ─────────────────────────────────────
          SECONDARY PACKAGES
      ───────────────────────────────────── */}

      {secondaryPackages.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
          {secondaryPackages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="min-h-[300px] lg:min-h-0 lg:flex-1"
            >
              <FeaturedPackageCard
                packageData={pkg}
                position={index + 2}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
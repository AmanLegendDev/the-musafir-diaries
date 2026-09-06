"use client";
import { useMemo, useState } from "react";
import PackageHero from "./PackageHero";
import PackageSearch from "./PackageSearch";
import PackageFilters from "./PackageFilters";
import PackageGrid from "./PackageGrid";
import PackageCTA from "./PackageCTA";
import { AnimatePresence, motion } from "framer-motion";
import { Package } from "@/types/package";
import type { Destination } from "@/lib/types/destination";
import type { Category } from "@/lib/types/category";
import { Footer } from "@/components/footer";
interface PackageListingProps {
  packages: Package[];
  categories: Category[];
  destinations: Destination[];
}

export default function PackageListing({
  packages,
  categories,
  destinations,
}: PackageListingProps) {

    const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [state, setState] = useState("all");
const [destination, setDestination] = useState("all");


const filteredPackages = useMemo(() => {
  let data = [...packages];

  if (search.trim()) {
    const query = search.toLowerCase();

    data = data.filter((pkg) =>
      pkg.name.toLowerCase().includes(query)
    );
  }

  return data;
}, [packages, search]);
const searching = search.trim().length > 0;




  return (
    <main className="min-h-screen bg-white">

      <PackageHero />

      <PackageSearch
  value={search}
  onSearch={setSearch}
/>

     <AnimatePresence mode="wait">
  {!searching && (
    <motion.div
      initial={{
        opacity: 1,
        height: "auto",
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      exit={{
        opacity: 0,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="overflow-hidden"
    >
      <PackageFilters
        categories={categories}
        destinations={destinations}
      />
    </motion.div>
  )}
</AnimatePresence>
   



   <motion.div
  layout
  transition={{
    duration: 0.35,
  }}
>
<PackageGrid
  packages={filteredPackages}
  searching={searching}
  search={search}
/>
</motion.div>

      <PackageCTA />
      <Footer/>

    </main>
  );
}
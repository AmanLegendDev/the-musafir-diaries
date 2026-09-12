import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import PackageHero from "@/components/packages/listing/PackageHero";
import PackageListing from "@/components/packages/listing/PackageListing";

import { getAllPackages } from "@/lib/queries/package.queries";

export const metadata: Metadata = {
  title: "Himalayan Travel Packages | The Musafir Diaries",
  description:
    "Explore thoughtfully crafted Himalayan travel packages with beautiful stays, meaningful experiences and journeys designed around your pace.",
};

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return (
    <>
      

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* Cinematic package hero */}
        <PackageHero />

        {/* Package discovery */}
        <section
          id="packages"
          className="scroll-mt-24 bg-[#FAF9F5] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
            <PackageListing packages={packages} />
          </div>
        </section>
      </main>

     
    </>
  );
}
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, List } from "lucide-react";
import Link from "next/link";

const CONTENTS = [
  {
    number: "01",
    title: "Information We Collect",
    href: "#information-we-collect",
  },
  {
    number: "02",
    title: "How We Use Your Information",
    href: "#how-we-use-information",
  },
  {
    number: "03",
    title: "How We Share Information",
    href: "#how-we-share-information",
  },
  {
    number: "04",
    title: "Travel Partners & Service Providers",
    href: "#travel-partners",
  },
  {
    number: "05",
    title: "Payments & Transactions",
    href: "#payments",
  },
  {
    number: "06",
    title: "Security",
    href: "#security",
  },
];

export default function PrivacyContents() {
  return (
    <section
      id="privacy-content"
      className="border-y border-[#071A33]/10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <List className="h-4 w-4 text-[#087E8B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                On this page
              </span>
            </div>

            <h2 className="mt-4 max-w-xs font-serif text-3xl leading-tight tracking-[-0.03em] text-[#071A33]">
              What this policy covers.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#071A33]/45">
              A quick way to find the information that matters to
              you.
            </p>
          </motion.div>

          <div className="grid border-t border-[#071A33]/10 sm:grid-cols-2 sm:border-t-0">
            {CONTENTS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="border-b border-[#071A33]/10 first:border-t sm:first:border-t-0 sm:odd:border-r"
              >
                <Link
                  href={item.href}
                  className="group flex min-w-0 items-center gap-4 px-1 py-5 sm:px-5 sm:py-6"
                >
                  <span className="shrink-0 text-[10px] font-semibold tracking-[0.15em] text-[#087E8B]/60">
                    {item.number}
                  </span>

                  <span className="min-w-0 flex-1 font-serif text-lg tracking-[-0.015em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B]">
                    {item.title}
                  </span>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#071A33]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#087E8B]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
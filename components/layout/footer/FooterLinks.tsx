"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Hotels & Stays", href: "/hotels" },
  { label: "The Musafir Journal", href: "/blogs" },
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Why Musafir Diaries", href: "/about#why-musafir" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Plan Your Journey", href: "/inquiry" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
        {title}
      </p>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1597C7]/40"
            >
              <span>{link.label}</span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 -translate-x-1 -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-10">
      <LinkColumn
        title="Explore"
        links={EXPLORE_LINKS}
      />

      <LinkColumn
        title="The Journey"
        links={COMPANY_LINKS}
      />
    </div>
  );
}
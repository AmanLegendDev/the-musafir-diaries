import Link from "next/link";
import { ArrowUpRight, Building2, MapPin, Route } from "lucide-react";

import type { FAQItemData } from "./FAQItem";

type Props = {
  faq: FAQItemData;
};

export default function FAQContextLinks({ faq }: Props) {
  const links: Array<{
    type: "destination" | "package" | "hotel";
    name: string;
    slug: string;
  }> = [];

  if (faq.destination?.name && faq.destination.slug) {
    links.push({
      type: "destination",
      name: faq.destination.name,
      slug: faq.destination.slug,
    });
  }

  if (faq.package?.name && faq.package.slug) {
    links.push({
      type: "package",
      name: faq.package.name,
      slug: faq.package.slug,
    });
  }

  if (faq.hotel?.name && faq.hotel.slug) {
    links.push({
      type: "hotel",
      name: faq.hotel.name,
      slug: faq.hotel.slug,
    });
  }

  if (!links.length) {
    return null;
  }

  const getLink = (
    type: "destination" | "package" | "hotel",
    slug: string
  ) => {
    if (type === "destination") {
      return `/destinations/${slug}`;
    }

    if (type === "package") {
      return `/packages/${slug}`;
    }

    return `/hotels/${slug}`;
  };

  const getIcon = (
    type: "destination" | "package" | "hotel"
  ) => {
    if (type === "destination") {
      return MapPin;
    }

    if (type === "package") {
      return Route;
    }

    return Building2;
  };

  const getLabel = (
    type: "destination" | "package" | "hotel"
  ) => {
    if (type === "destination") {
      return "Related destination";
    }

    if (type === "package") {
      return "Related journey";
    }

    return "Related stay";
  };

  return (
    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {links.map((link) => {
        const Icon = getIcon(link.type);

        return (
          <Link
            key={`${link.type}-${link.slug}`}
            href={getLink(link.type, link.slug)}
            className="group inline-flex min-w-0 items-center gap-3 rounded-2xl border border-[#071A33]/8 bg-white px-4 py-3 transition duration-300 hover:border-[#087E8B]/20 hover:bg-[#087E8B]/4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF9F5] text-[#087E8B]">
              <Icon
                className="h-4 w-4"
                strokeWidth={1.6}
              />
            </span>

            <span className="min-w-0">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#071A33]/35">
                {getLabel(link.type)}
              </span>

              <span className="mt-0.5 block truncate text-sm font-semibold text-[#071A33]">
                {link.name}
              </span>
            </span>

            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#071A33]/30 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#087E8B]" />
          </Link>
        );
      })}
    </div>
  );
}
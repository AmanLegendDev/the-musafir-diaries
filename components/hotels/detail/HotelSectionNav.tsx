"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Camera,
  ClipboardList,
  DoorOpen,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type Props = {
  hotelSlug: string;
};

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: Building2,
  },
  {
    id: "amenities",
    label: "Amenities",
    icon: Sparkles,
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: DoorOpen,
  },
  {
    id: "policies",
    label: "Policies",
    icon: ClipboardList,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: Camera,
  },
  {
    id: "faqs",
    label: "FAQs",
    icon: HelpCircle,
  },
];

export default function HotelSectionNav({
  hotelSlug,
}: Props) {
  const [activeSection, setActiveSection] =
    useState("overview");

  useEffect(() => {
    const sections = NAV_ITEMS.map(
      (item) =>
        document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visibleSections[0]?.target?.id) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (
    sectionId: string
  ) => {
    const section =
      document.getElementById(sectionId);

    if (!section) return;

    const navOffset = 88;
    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <div
      data-hotel-slug={hotelSlug}
      className="sticky top-0 z-40 border-b border-[#071A33]/8 bg-white/95 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex h-[68px] items-center gap-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleNavigation(item.id)
                }
                className={`group relative flex h-full shrink-0 items-center gap-2 px-3 text-xs font-semibold transition sm:px-4 ${
                  isActive
                    ? "text-[#087E8B]"
                    : "text-[#071A33]/45 hover:text-[#071A33]"
                }`}
                aria-current={
                  isActive
                    ? "location"
                    : undefined
                }
              >
                <Icon
                  className={`h-3.5 w-3.5 transition ${
                    isActive
                      ? "text-[#087E8B]"
                      : "text-[#071A33]/30 group-hover:text-[#087E8B]"
                  }`}
                  strokeWidth={1.8}
                />

                <span>{item.label}</span>

                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#087E8B] transition-all duration-300 sm:left-4 sm:right-4 ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
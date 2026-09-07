"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "./navigation";

type Props = {
  pathname: string;
  destinationsOpen: boolean;
  onDestinationToggle: () => void;
  onCloseMenu: () => void;
};

export default function DesktopNavigation({
  pathname,
  destinationsOpen,
  onDestinationToggle,
  onCloseMenu,
}: Props) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center lg:flex"
    >
      <ul className="flex items-center gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);

          if (item.hasMegaMenu) {
            return (
              <li
                key={item.label}
                className="relative"
              >
                <button
                  type="button"
                  aria-expanded={destinationsOpen}
                  aria-haspopup="true"
                  onClick={onDestinationToggle}
                  className={[
                    "relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                    active
                      ? "text-[#071A33]"
                      : "text-[#071A33]/65 hover:text-[#071A33]",
                  ].join(" ")}
                >
                  {active && (
                    <motion.span
                      layoutId="musafir-active-nav"
                      className="absolute inset-0 -z-10 rounded-full bg-[#087E8B]/10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {item.label}

                  <ChevronDown
                    className={[
                      "h-3.5 w-3.5 transition-transform",
                      destinationsOpen
                        ? "rotate-180 text-[#087E8B]"
                        : "",
                    ].join(" ")}
                  />
                </button>
              </li>
            );
          }

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onCloseMenu}
                className={[
                  "relative block rounded-full px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                  active
                    ? "text-[#071A33]"
                    : "text-[#071A33]/65 hover:text-[#071A33]",
                ].join(" ")}
              >
                {active && (
                  <motion.span
                    layoutId="musafir-active-nav"
                    className="absolute inset-0 -z-10 rounded-full bg-[#087E8B]/10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
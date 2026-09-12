"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Hotel,
  Images,
  HelpCircle,
  Info,
  Home,
  BookOpen,
  Mail,
  Package,
  X,
} from "lucide-react";
import { NAV_ITEMS } from "./navigation";

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

const ICONS = {
  Home: Home,
  Destinations: Compass,
  Packages: Package,
  Hotels: Hotel,
  Gallery: Images,
  Blogs: BookOpen,
  FAQs: HelpCircle,
  About: Info,
  Contact: Mail,
};

export default function MobileMenu({
  open,
  pathname,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-[#071A33]/45 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}

          <motion.aside
            initial={{
              opacity: 0,
              y: -18,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -18,
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-3 top-3 bottom-3 z-[90] flex flex-col overflow-hidden rounded-[30px] border border-[#071A33]/10 bg-[#FAF9F5] shadow-[0_30px_100px_rgba(7,26,51,0.25)] lg:hidden"
          >
            {/* Top */}

            {/* Top */}

<div className="flex items-center justify-between border-b border-[#071A33]/8 px-5 py-4">
  <Link
    href="/"
    onClick={onClose}
    aria-label="The Musafir Diaries home"
    className="flex items-center gap-3"
  >
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
      <img
        src="/logo.png"
        alt="The Musafir Diaries"
        className="h-full w-full object-contain"
      />
    </div>

    <span className="flex flex-col leading-none">
      <span className="font-serif text-[18px] font-bold tracking-[-0.02em] text-[#071A33]">
        The Musafir
      </span>

      <span className="mt-1 font-serif text-[18px] font-bold tracking-[-0.02em] text-[#087E8B]">
        Diaries
      </span>
    </span>
  </Link>

  <button
    type="button"
    aria-label="Close menu"
    onClick={onClose}
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#071A33]/10 bg-white text-[#071A33] transition-transform active:scale-95"
  >
    <X className="h-5 w-5" />
  </button>
</div>

            {/* Navigation */}

            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto px-4 py-5"
            >
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(
                          item.href,
                        );

                  const Icon =
                    ICONS[
                      item.label as keyof typeof ICONS
                    ];

                  return (
                    <motion.li
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                     transition={{
  delay: index * 0.015,
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1],
}}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={[
                          "group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all",
                          active
                            ? "bg-[#071A33] text-white"
                            : "text-[#071A33] hover:bg-[#071A33]/[0.045]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            active
                              ? "bg-white/10"
                              : "bg-[#087E8B]/10 text-[#087E8B]",
                          ].join(" ")}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="flex-1 text-[15px] font-semibold">
                          {item.label}
                        </span>

                        <span className="text-[10px] font-medium opacity-30">
                          0{index + 1}
                        </span>

                        <ArrowUpRight
                          className={[
                            "h-4 w-4 transition-transform",
                            active
                              ? "opacity-100"
                              : "opacity-25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                          ].join(" ")}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA */}

            <div className="border-t border-[#071A33]/8 p-4">
              <Link
                href="/inquiry"
                onClick={onClose}
                className="group flex items-center justify-between rounded-2xl bg-[#F59E0B] px-5 py-4 text-[#071A33] shadow-[0_14px_35px_rgba(245,158,11,0.20)]"
              >
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                    Your next story
                  </span>

                  <span className="mt-1 block text-sm font-bold">
                    Plan Your Journey
                  </span>
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071A33] text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
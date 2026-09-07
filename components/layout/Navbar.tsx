"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";

import NavbarLogo from "./NavbarLogo";
import DesktopNavigation from "./DesktopNavigation";
import DestinationMegaMenu from "./DestinationMegaMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [destinationsOpen, setDestinationsOpen] =
    useState(false);

  /* =========================================================
     SCROLL
     ========================================================= */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(
          window.scrollY > 28,
        );

        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* =========================================================
     MOBILE BODY LOCK
     ========================================================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  /* =========================================================
     ESCAPE
     ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setDestinationsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* =========================================================
     ROUTE CHANGE
     ========================================================= */

 useEffect(() => {
  queueMicrotask(() => {
    setMobileOpen(false);
    setDestinationsOpen(false);
  });
}, [pathname]);

  /* =========================================================
     HANDLERS
     ========================================================= */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setDestinationsOpen(false);
  }, []);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-7"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "relative mx-auto flex h-[68px] max-w-[1440px] items-center rounded-[23px] border px-3 transition-all duration-300 sm:h-[72px] sm:px-5 lg:h-[76px] lg:px-6",
            scrolled
              ? "border-[#071A33]/10 bg-[#FAF9F5]/92 shadow-[0_18px_55px_rgba(7,26,51,0.10)] backdrop-blur-2xl"
              : "border-white/20 bg-white/70 shadow-[0_12px_45px_rgba(7,26,51,0.07)] backdrop-blur-xl",
          ].join(" ")}
        >
          {/* Logo */}

          <NavbarLogo />

          {/* Center navigation */}

          <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <DesktopNavigation
              pathname={pathname}
              destinationsOpen={
                destinationsOpen
              }
              onDestinationToggle={() =>
                setDestinationsOpen(
                  (previous) =>
                    !previous,
                )
              }
              onCloseMenu={closeMenus}
            />
          </div>

          {/* Right CTA */}

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/under-development"
              className="group hidden items-center gap-2 rounded-full bg-[#071A33] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_rgba(7,26,51,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0D2747] lg:inline-flex"
            >
              Plan Your Journey

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile hamburger */}

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen(
                  (previous) =>
                    !previous,
                );

                setDestinationsOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#071A33]/10 bg-white text-[#071A33] transition-all active:scale-95 lg:hidden"
            >
              <motion.div
                animate={{
                  rotate: mobileOpen
                    ? 90
                    : 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {mobileOpen ? (
                  <span className="text-lg">
                    ×
                  </span>
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Destination mega menu */}

          <DestinationMegaMenu
            open={destinationsOpen}
            onClose={() =>
              setDestinationsOpen(false)
            }
          />
        </motion.div>
      </header>

      {/* Mobile */}

      <MobileMenu
        open={mobileOpen}
        pathname={pathname}
        onClose={() =>
          setMobileOpen(false)
        }
      />
    </>
  );
}
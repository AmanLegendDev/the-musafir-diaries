"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

type NavItem = {
  label: string;
  href: string;
};

type SocialItem = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS: SocialItem[] = [
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaXTwitter,
    href: "#",
    label: "Twitter",
  },
];

const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -80,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },

  exit: {
    opacity: 0,
    y: -20,
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.4,
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname.startsWith(href);
    },
    [pathname]
  );

  const Logo = useMemo(
    () => (
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2"
        aria-label="Altitude Escapes Home"
      >
<Image
  src="/logo.png"
  alt="Altitude Escapes"
  width={52}
  height={52}
  priority
className="h-16 w-16 object-contain sm:h-14 sm:w-14 lg:h-20 lg:w-20"
/>
        
        

        <div className="leading-tight">
          <h2 className="font-heading text-[15px] sm:text-[16px] lg:text-[18px]font-bold tracking-tight text-slate-900">
            Altitude{" "}
            <span className="text-[#3BAEA0]">
              Escapes
            </span>
          </h2>

          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            Luxury Himalayan Travel
          </p>
        </div>
      </Link>
    ),
    []
  );

  return (
        <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 lg:px-8"
      >
        <motion.nav
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.82)"
              : "rgba(255,255,255,0.10)",

            borderColor: scrolled
              ? "rgba(226,232,240,.9)"
              : "rgba(255,255,255,.18)",

            boxShadow: scrolled
              ? "0 18px 60px rgba(15,23,42,.10)"
              : "0 10px 40px rgba(15,23,42,.05)",
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            relative
            flex
           h-[68px] sm:h-[72px] lg:h-[76px]
            w-full
            max-w-[1480px]
            items-center
            justify-between
            rounded-[28px]
            border
            backdrop-blur-2xl
            px-4 sm:px-6 lg:px-10
            sm:px-7
            lg:px-10
          "
        >
          {Logo}

          <ul
            className="
              hidden
              lg:flex
              items-center
              gap-1
              rounded-full
              bg-white/55
              p-1.5
              backdrop-blur-xl
            "
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <li
                  key={item.href}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="
                      relative
                      z-10
                      block
                      rounded-full
                      px-5
                      py-3
                      text-[14px]
                      font-medium
                      transition-colors
                      duration-300
                    "
                    style={{
                      color: active
                        ? "#0F4C81"
                        : "#475569",
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 32,
                        }}
                        className="
                          absolute
                          inset-0
                          -z-10
                          rounded-full
                          bg-white
                          shadow-[0_10px_25px_rgba(15,23,42,.08)]
                        "
                      />
                    )}

                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <motion.div
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                href="/packages"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#0F4C81]
                  px-6
                  py-3
                  text-[14px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                "
                style={{
                  boxShadow:
                    "0 18px 40px rgba(15,76,129,.28)",
                }}
              >
                Explore Journeys

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="
              relative
              flex
              h-10
w-10
sm:h-11
sm:w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white/80
             
              lg:hidden
            "
          >
            <div className="relative h-5 w-6">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, top: 8 }
                    : { rotate: 0, top: 0 }
                }
                className="absolute left-0 h-[2px] w-full rounded-full bg-slate-900"
              />

              <motion.span
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                }}
                className="absolute left-0 top-2 h-[2px] w-full rounded-full bg-slate-900"
              />

              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, top: 8 }
                    : { rotate: 0, top: 16 }
                }
                className="absolute left-0 h-[2px] w-full rounded-full bg-slate-900"
              />
            </div>
          </button>
        </motion.nav>
      </motion.header>
            <AnimatePresence mode="wait">
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            />

            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                fixed
                inset-x-4
                top-[96px]
                bottom-4
                z-50
                overflow-y-auto
                rounded-[32px]
                border
                border-white/20
                bg-white/90
                p-8
              
                shadow-[0_30px_80px_rgba(15,23,42,.18)]
                lg:hidden
              "
            >
              <nav className="mt-4">
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <motion.li
                        key={item.href}
                        variants={itemVariants}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            px-5
                            py-4
                            text-[28px]
                            font-semibold
                            tracking-tight
                            transition-all
                            duration-300
                            ${
                              active
                                ? "bg-[#0F4C81] text-white shadow-lg"
                                : "text-slate-800 hover:bg-slate-100"
                            }
                          `}
                        >
                          <span>{item.label}</span>

                          <ArrowUpRight
                            size={22}
                            className={
                              active
                                ? "opacity-100"
                                : "opacity-40"
                            }
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

              <motion.div
                variants={itemVariants}
                className="mt-8 space-y-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4C81]/10">
                    <Phone
                      size={18}
                      className="text-[#0F4C81]"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Call Us
                    </p>

                    <p className="font-medium text-slate-800">
                      +91 XXXXX XXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4C81]/10">
                    <Mail
                      size={18}
                      className="text-[#0F4C81]"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Email
                    </p>

                    <p className="font-medium text-slate-800">
                      hello@altitudeescapes.com
                    </p>
                  </div>
                </div>
                                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4C81]/10">
                    <MapPin
                      size={18}
                      className="text-[#0F4C81]"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Location
                    </p>

                    <p className="font-medium text-slate-800">
                      Shimla, Himachal Pradesh
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-10"
              >
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-400">
                  Follow Us
                </p>

                <div className="flex items-center gap-3">
                  {SOCIALS.map((social) => {
                    const Icon = social.icon;

                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          text-slate-700
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-[#0F4C81]
                          hover:text-[#0F4C81]
                        "
                      >
                        <Icon size={18} />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12"
              >
                <Link
                  href="/packages"
                  onClick={() => setMobileOpen(false)}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-[#0F4C81]
                    px-6
                    py-4
                    text-base
                    font-semibold
                    text-white
                    shadow-[0_18px_40px_rgba(15,76,129,.30)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  Explore Journeys

                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
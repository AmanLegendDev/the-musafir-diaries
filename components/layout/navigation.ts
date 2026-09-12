import {
  Compass,
  Hotel,
  Images,
  HelpCircle,
  Info,
  Mail,
  Package,
  Home,
  BookOpen,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    hasMegaMenu: false,
  },

  {
    label: "Destinations",
    href: "/destinations",
    icon: Compass,
    hasMegaMenu: true,
  },

  {
    label: "Packages",
    href: "/packages",
    icon: Package,
    hasMegaMenu: false,
  },

  {
    label: "Hotels",
    href: "/hotels",
    icon: Hotel,
    hasMegaMenu: false,
  },

  
  {
    label: "Blogs",
    href: "/blogs",
    icon: BookOpen,
    hasMegaMenu: false,
  },

  {
    label: "FAQs",
    href: "/faq",
    icon: HelpCircle,
    hasMegaMenu: false,
  },

  {
    label: "About",
    href: "/about",
    icon: Info,
    hasMegaMenu: false,
  },

  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
    hasMegaMenu: false,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
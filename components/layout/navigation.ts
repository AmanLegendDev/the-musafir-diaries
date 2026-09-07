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
    href: "/under-development",
    icon: Compass,
    hasMegaMenu: true,
  },
  {
    label: "Packages",
    href: "/under-development",
    icon: Package,
    hasMegaMenu: false,
  },
  {
    label: "Hotels",
    href: "/under-development",
    icon: Hotel,
    hasMegaMenu: false,
  },
  {
    label: "Gallery",
    href: "/under-development",
    icon: Images,
    hasMegaMenu: false,
  },
  {
    label: "Blogs",
    href: "/under-development",
    icon: BookOpen,
    hasMegaMenu: false,
  },
  {
    label: "FAQs",
    href: "/under-development",
    icon: HelpCircle,
    hasMegaMenu: false,
  },
  {
    label: "About",
    href: "/under-development",
    icon: Info,
    hasMegaMenu: false,
  },
  {
    label: "Contact",
    href: "/under-development",
    icon: Mail,
    hasMegaMenu: false,
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];


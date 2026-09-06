import { ROUTES } from "./routes";

export const MAIN_NAVIGATION = [
  {
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    title: "Packages",
    href: ROUTES.PACKAGES,
  },
  {
    title: "Destinations",
    href: ROUTES.DESTINATIONS,
  },
  {
    title: "Blogs",
    href: ROUTES.BLOGS,
  },
  {
    title: "Gallery",
    href: ROUTES.GALLERY,
  },
  {
    title: "About",
    href: ROUTES.ABOUT,
  },
  {
    title: "Contact",
    href: ROUTES.CONTACT,
  },
] as const;

export const FOOTER_NAVIGATION = [
  {
    title: "Privacy Policy",
    href: ROUTES.PRIVACY_POLICY,
  },
  {
    title: "Terms & Conditions",
    href: ROUTES.TERMS,
  },
  {
    title: "Refund Policy",
    href: ROUTES.REFUND_POLICY,
  },
  {
    title: "Cancellation Policy",
    href: ROUTES.CANCELLATION_POLICY,
  },
] as const;
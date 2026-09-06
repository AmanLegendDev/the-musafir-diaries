export const siteConfig = {
  // Brand
  name: "Altitude Escapes",
  shortName: "Altitude",
  tagline: "Every Journey Begins With Trust.",

  // URLs
  url: "https://altitude-escapes.vercel.app",
  basePath: "/",

  // Company
  company: {
    name: "Altitude Escapes",
    legalName: "Altitude Escapes",
  },

  // Contact
  contact: {
    email: "hello@altitudeescapes.com",
    phone: "+91 9876543210",
    whatsapp: "+919876543210",
  },

  // Location
  address: {
    city: "Shimla",
    state: "Himachal Pradesh",
    country: "India",
  },

  // Branding
  logo: {
    light: "/logos/logo-light.svg",
    dark: "/logos/logo-dark.svg",
    icon: "/logos/logo-icon.svg",
    favicon: "/favicon.ico",
    og: "/images/og-image.jpg",
  },

  // Social
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  },

  // SEO
  seo: {
    title: "Altitude Escapes",
    description:
      "Premium travel experiences crafted with trust, comfort and unforgettable adventures.",
    keywords: [
      "Travel Agency",
      "Travel Packages",
      "Luxury Travel",
      "Adventure Tours",
      "Holiday Packages",
      "Shimla Tours",
      "Himachal Tours",
      "Altitude Escapes",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
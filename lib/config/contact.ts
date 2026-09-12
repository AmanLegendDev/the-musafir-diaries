export const CONTACT_CONFIG = {
  phone: {
    display: "999999999",
    href: "tel:999999999",
  },

  email: {
    display: "hello@themusafirdiaries.com",
    href: "mailto:hello@themusafirdiaries.com",
  },

  whatsapp: {
    display: "WhatsApp",
    href: "https://wa.me/919999999999",
  },

  instagram: {
    display: "Instagram",
    href: "https://instagram.com/",
  },

  site: {
    name: "The Musafir Diaries",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://the-musafir-diaries.vercel.app",
  },
} as const;
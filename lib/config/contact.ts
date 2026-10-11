export const CONTACT_CONFIG = {
  phone: {
    display: "8262946566",
    href: "tel:8262946566",
  },

  email: {
    display: "hello@themusafirdiaries.com",
    href: "mailto:hello@themusafirdiaries.com",
  },

  whatsapp: {
    display: "WhatsApp",
    href: "https://wa.me/918262946566",
  },

  instagram: {
    display: "Instagram",
    href: "https://www.instagram.com/the_musafirdiaries2026?xtok=cjdpdTF1a3J1azF3",
  },

  site: {
    name: "The Musafir Diaries",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://the-musafir-diaries.vercel.app",
  },
} as const;
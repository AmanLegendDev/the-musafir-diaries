export const PRIVACY_CONFIG = {
  businessName: "The Musafir Diaries",

  website:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://the-musafir-diaries.vercel.app",

  email: "hello@themusafirdiaries.com",

  effectiveDate: "September 2026",

  lastUpdated: "September 2026",

  location: "Shimla, Himachal Pradesh, India",
} as const;
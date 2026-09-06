import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export function createMetadata(
  title?: string,
  description?: string
): Metadata {
  return {
    title: title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.seo.title,

    description:
      description ??
      siteConfig.seo.description,

    openGraph: {
      title:
        title ??
        siteConfig.seo.title,

      description:
        description ??
        siteConfig.seo.description,

      url: siteConfig.url,

      siteName: siteConfig.name,

      images: [
        {
          url: siteConfig.logo.og,
        },
      ],

      locale: "en_IN",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        title ??
        siteConfig.seo.title,

      description:
        description ??
        siteConfig.seo.description,

      images: [siteConfig.logo.og],
    },
  };
}
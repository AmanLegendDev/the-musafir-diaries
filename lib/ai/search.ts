import { detectIntent } from "./intent";

import { buildAIContext } from "./context";

import {
  formatBlogs,
  formatGallery,
  formatPackages,
  formatTestimonials,
} from "./formatter";

import {
  getBlogs,
  getFeaturedPackages,
  getGalleryImages,
  getRelevantPackages,
  getTestimonials,
} from "./queries";

export async function searchKnowledge(
  message: string
) {
  const intent = detectIntent(message);

  let packages: any[] = [];
  let blogs: any[] = [];
  let gallery: any[] = [];
  let testimonials: any[] = [];

  switch (intent.type) {
    case "package":
    case "destination":
    case "booking":
      packages =
        await getRelevantPackages(intent);

      break;

    case "blog":
      blogs = await getBlogs();

      break;

    case "gallery":
      gallery =
        await getGalleryImages();

      break;

    case "company":
      testimonials =
        await getTestimonials();

      packages =
        await getFeaturedPackages();

      break;

    default:
      packages =
        await getFeaturedPackages();

      testimonials =
        await getTestimonials();

      break;
  }

  const context = buildAIContext({
    packages,
    blogs,
    contact: {
      phone: "+91 XXXXXXXXXX",

      email:
        "info@altitudeescapes.com",

      address:
        "Dhalli, Shimla, Himachal Pradesh",

      hours:
        "Mon - Sat : 9:00 AM - 7:00 PM",
    },
  });

  return {
    intent,

    context,

    data: {
      packages,

      blogs,

      gallery,

      testimonials,
    },

    formatted: {
      packages:
        formatPackages(packages),

      blogs:
        formatBlogs(blogs),

      gallery:
        formatGallery(gallery),

      testimonials:
        formatTestimonials(
          testimonials
        ),
    },
  };
}
import { IPackage } from "@/models/package.model";

export function formatPackages(
  packages: any[]
): string {
  if (!packages.length) {
    return "No packages available.";
  }

  return packages
    .map((pkg: any, index: number) => {
      return `
━━━━━━━━━━━━━━━━━━━━━━

PACKAGE ${index + 1}

Name:
${pkg.name}

Destination:
${pkg.destination?.name ?? "N/A"}

Category:
${pkg.category?.name ?? "N/A"}

Short Description:
${pkg.shortDescription || "-"}

Duration:
${pkg.duration || "-"}

Difficulty:
${pkg.difficulty || "-"}

Group Size:
${pkg.groupSize || "-"}

Original Price:
₹${pkg.originalPrice}

Offer Price:
₹${pkg.discountedPrice}

Highlights:
${
  pkg.highlights?.length
    ? pkg.highlights.map((h: string) => `• ${h}`).join("\n")
    : "-"
}

Included:
${
  pkg.included?.length
    ? pkg.included.map((i: string) => `• ${i}`).join("\n")
    : "-"
}

Excluded:
${
  pkg.excluded?.length
    ? pkg.excluded.map((e: string) => `• ${e}`).join("\n")
    : "-"
}

Featured:
${pkg.featured ? "Yes" : "No"}

Status:
${pkg.status}
`;
    })
    .join("\n");
}

export function formatBlogs(
  blogs: any[]
): string {
  if (!blogs.length) {
    return "No blogs available.";
  }

  return blogs
    .map((blog: any) => {
      return `
━━━━━━━━━━━━━━━━━━━━━━

Title:
${blog.title}

Excerpt:
${blog.excerpt}

Author:
${blog.author}

Read Time:
${blog.readTime} min

Category:
${blog.category?.name ?? "-"}

Tags:
${blog.tags?.join(", ") || "-"}
`;
    })
    .join("\n");
}

export function formatTestimonials(
  testimonials: any[]
): string {
  if (!testimonials.length) {
    return "No testimonials available.";
  }

  return testimonials
    .map((item: any) => {
      return `
━━━━━━━━━━━━━━━━━━━━━━

Customer:
${item.name}

Location:
${item.location}

Trip:
${item.trip}

Rating:
${item.rating}/5

Review:
${item.review}
`;
    })
    .join("\n");
}

export function formatGallery(
  images: any[]
): string {
  if (!images.length) {
    return "No gallery images available.";
  }

  return images
    .map((image: any) => {
      return `
━━━━━━━━━━━━━━━━━━━━━━

Title:
${image.title}

Category:
${image.category}

Description:
${image.description}
`;
    })
    .join("\n");
}
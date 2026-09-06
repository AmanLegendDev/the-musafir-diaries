import { formatPackages } from "./formatter";

interface AIContextParams {
  packages?: any[];
  destinations?: any[];
  blogs?: any[];
  faqs?: any[];
  contact?: any;
}

export function buildAIContext({
  packages = [],
  destinations = [],
  blogs = [],
  faqs = [],
  contact,
}: AIContextParams) {
  const sections: string[] = [];

  /* -------------------------------- */
  /* COMPANY                          */
  /* -------------------------------- */

  sections.push(`
# COMPANY

Name: Altitude Escapes

Type: Premium Himalayan Travel Company

Mission:
Deliver unforgettable luxury travel experiences across the Himalayas.

`);

  /* -------------------------------- */
  /* PACKAGES                         */
  /* -------------------------------- */

  if (packages.length) {
    sections.push(`
# PACKAGES

${formatPackages(packages)}
`);
  }

  /* -------------------------------- */
  /* DESTINATIONS                     */
  /* -------------------------------- */

  if (destinations.length) {
    sections.push(`
# DESTINATIONS

${destinations
      .map((d) => {
        return `
• ${d.name}

${d.description ?? ""}
`;
      })
      .join("\n")}
`);
  }

  /* -------------------------------- */
  /* BLOGS                            */
  /* -------------------------------- */

  if (blogs.length) {
    sections.push(`
# BLOGS

${blogs
      .map((blog) => {
        return `
• ${blog.title}
`;
      })
      .join("\n")}
`);
  }

  /* -------------------------------- */
  /* FAQ                              */
  /* -------------------------------- */

  if (faqs.length) {
    sections.push(`
# FAQ

${faqs
      .map((faq) => {
        return `
Q: ${faq.question}

A: ${faq.answer}
`;
      })
      .join("\n")}
`);
  }

  /* -------------------------------- */
  /* CONTACT                          */
  /* -------------------------------- */

  if (contact) {
    sections.push(`
# CONTACT

Phone:
${contact.phone ?? "-"}

Email:
${contact.email ?? "-"}

Address:
${contact.address ?? "-"}

Business Hours:
${contact.hours ?? "-"}
`);
  }

  /* -------------------------------- */

  return sections.join("\n\n");
}   
export type AIIntentType =
  | "package"
  | "destination"
  | "blog"
  | "booking"
  | "contact"
  | "gallery"
  | "company"
  | "greeting"
  | "general";

export interface AIIntent {
  type: AIIntentType;

  destination?: string;

  category?: string;

  budget?: number;

  duration?: number;

  featured?: boolean;

  sort?:
    | "price_low"
    | "price_high"
    | "featured";

  keywords: string[];
}

const DESTINATIONS = [
  "shimla",
  "manali",
  "kasol",
  "spiti",
  "kinnaur",
  "dalhousie",
  "dharamshala",
  "kufri",
  "chitkul",
];

const CATEGORIES = [
  "honeymoon",
  "family",
  "friends",
  "solo",
  "luxury",
  "adventure",
  "group",
];

const BLOG_KEYWORDS = [
  "blog",
  "article",
  "guide",
  "tips",
];

const CONTACT_KEYWORDS = [
  "contact",
  "phone",
  "call",
  "email",
  "office",
  "address",
  "location",
];

const BOOKING_KEYWORDS = [
  "book",
  "booking",
  "reserve",
  "reservation",
];

const GALLERY_KEYWORDS = [
  "gallery",
  "photos",
  "images",
  "pictures",
];

const COMPANY_KEYWORDS = [
  "about",
  "company",
  "team",
  "who are you",
];

const GREETINGS = [
  "hi",
  "hello",
  "hey",
  "hii",
];

export function detectIntent(
  message: string
): AIIntent {
  const text = message.toLowerCase();

  const keywords = text
    .split(/\s+/)
    .filter(Boolean);

  const intent: AIIntent = {
    type: "general",
    keywords,
  };

  /* -------------------- */
  /* Greeting             */
  /* -------------------- */

  if (
    GREETINGS.some((word) =>
      text.includes(word)
    )
  ) {
    intent.type = "greeting";
  }

  /* -------------------- */
  /* Destination          */
  /* -------------------- */

  const destination =
    DESTINATIONS.find((d) =>
      text.includes(d)
    );

  if (destination) {
    intent.destination =
      destination;

    intent.type = "destination";
  }

  /* -------------------- */
  /* Category             */
  /* -------------------- */

  const category =
    CATEGORIES.find((c) =>
      text.includes(c)
    );

  if (category) {
    intent.category = category;

    intent.type = "package";
  }

  /* -------------------- */
  /* Budget               */
  /* -------------------- */

  const budget =
    text.match(/\d+/);

  if (budget) {
    intent.budget =
      Number(budget[0]);
  }

  /* -------------------- */
  /* Duration             */
  /* -------------------- */

  const duration =
    text.match(
      /(\d+)\s*(day|days|night|nights)/i
    );

  if (duration) {
    intent.duration =
      Number(duration[1]);

    intent.type = "package";
  }

  /* -------------------- */
  /* Cheapest             */
  /* -------------------- */

  if (
    text.includes("cheap") ||
    text.includes("budget") ||
    text.includes("lowest")
  ) {
    intent.sort = "price_low";

    intent.type = "package";
  }

  if (
    text.includes("expensive") ||
    text.includes("premium") ||
    text.includes("luxury")
  ) {
    intent.sort = "price_high";

    intent.type = "package";
  }

  if (
    text.includes("featured") ||
    text.includes("best")
  ) {
    intent.featured = true;

    intent.type = "package";
  }

  /* -------------------- */
  /* Blog                 */
  /* -------------------- */

  if (
    BLOG_KEYWORDS.some((k) =>
      text.includes(k)
    )
  ) {
    intent.type = "blog";
  }

  /* -------------------- */
  /* Booking              */
  /* -------------------- */

  if (
    BOOKING_KEYWORDS.some((k) =>
      text.includes(k)
    )
  ) {
    intent.type = "booking";
  }

  /* -------------------- */
  /* Contact              */
  /* -------------------- */

  if (
    CONTACT_KEYWORDS.some((k) =>
      text.includes(k)
    )
  ) {
    intent.type = "contact";
  }

  /* -------------------- */
  /* Gallery              */
  /* -------------------- */

  if (
    GALLERY_KEYWORDS.some((k) =>
      text.includes(k)
    )
  ) {
    intent.type = "gallery";
  }

  /* -------------------- */
  /* Company              */
  /* -------------------- */

  if (
    COMPANY_KEYWORDS.some((k) =>
      text.includes(k)
    )
  ) {
    intent.type = "company";
  }

  /* -------------------- */
  /* Generic Package      */
  /* -------------------- */

  if (
    text.includes("package") ||
    text.includes("trip") ||
    text.includes("tour")
  ) {
    intent.type = "package";
  }

  return intent;
}
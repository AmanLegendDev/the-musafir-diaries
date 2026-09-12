export const BOOKING_CONFIG = {
  businessName: "The Musafir Diaries",

  support: {
    phone: "999999999",
    email: "hello@themusafirdiaries.com",
    whatsapp: "https://wa.me/919999999999",
  },

  steps: [
    {
      id: 1,
      label: "Traveller",
      shortLabel: "Details",
    },
    {
      id: 2,
      label: "Journey",
      shortLabel: "Trip",
    },
    {
      id: 3,
      label: "Review",
      shortLabel: "Review",
    },
  ],
} as const;
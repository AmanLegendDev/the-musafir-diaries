export const WHATSAPP_CONFIG = {
  phone: "918262946566",

  message:
    "Hi The Musafir Diaries! I’m interested in planning a Himalayan journey. Could you help me?",
} as const;

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
  WHATSAPP_CONFIG.message,
)}`;
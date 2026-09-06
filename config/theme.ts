export const theme = {
  colors: {
    primary: "#0F4C81",
    secondary: "#38BDF8",
    accent: "#F97316",

    background: "#F8FAFC",
    surface: "#FFFFFF",

    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },

    border: "#E2E8F0",

    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },

  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,.05)",
    md: "0 4px 12px rgba(0,0,0,.08)",
    lg: "0 12px 24px rgba(0,0,0,.12)",
  },
} as const;
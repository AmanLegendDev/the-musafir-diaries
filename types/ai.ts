export type AIMessageRole =
  | "user"
  | "assistant"
  | "system";

export interface Message {
  id: string;

  role: AIMessageRole;

  content: string;

  createdAt?: Date;
}

export interface SuggestedQuestion {
  id: string;

  title: string;

  prompt: string;
}

export interface AIChatState {
  open: boolean;
  loading: boolean;
  messages: Message[];
}
export interface AIResponse {
  success: boolean;

  reply: string;

  error?: string;
}

export interface AIRequest {
  messages: {
    role: AIMessageRole;
    content: string;
  }[];
}

export const DEFAULT_SUGGESTIONS: SuggestedQuestion[] = [
  {
    id: "1",
    title: "🏔 Best Packages",
    prompt: "Show me your best travel packages.",
  },
  {
    id: "2",
    title: "❤️ Honeymoon",
    prompt: "Recommend honeymoon packages.",
  },
  {
    id: "3",
    title: "👨‍👩‍👧 Family Tour",
    prompt: "Suggest family tour packages.",
  },
  {
    id: "4",
    title: "💰 Budget Trips",
    prompt: "Show packages under ₹30000.",
  },
  {
    id: "5",
    title: "❄ Snow Destinations",
    prompt: "Where can I experience snowfall?",
  },
];
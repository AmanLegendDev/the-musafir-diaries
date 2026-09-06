import { LucideIcon } from "lucide-react";

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  travelers: string;
  budget?: string;
  pickupLocation?: string;
  message: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InquiryHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}



export interface InquiryFormProps {
  destinations: string[];
}

export interface HowItWorksProps {
  steps: Step[];
}

export interface WhyChooseUsProps {
  features: Feature[];
}

export interface InquiryFAQProps {
  faqs: FAQItem[];
}
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone or WhatsApp number.")
    .max(30, "Phone number is too long."),

  destination: z
    .string()
    .trim()
    .min(2, "Please tell us your preferred destination.")
    .max(150, "Destination is too long."),

  travelDates: z
    .string()
    .trim()
    .max(100, "Travel dates are too long.")
    .optional()
    .default(""),

  travellers: z
    .string()
    .trim()
    .max(100, "Traveller details are too long.")
    .optional()
    .default(""),

  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your journey.")
    .max(5000, "Message is too long."),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
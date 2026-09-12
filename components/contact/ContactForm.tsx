"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

import ContactFormFields from "./ContactFormFields";
import ContactFormSuccess from "./ContactFormSuccess";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: string;
  travellers: string;
  message: string;
};

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  travelDates: "",
  travellers: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });

    setSubmitError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitError("");

    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Please enter your phone or WhatsApp number.";
    }

    if (!form.destination.trim()) {
      nextErrors.destination = "Tell us where you're thinking of going.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Tell us a little about your journey.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <ContactFormSuccess
        onReset={() => {
          setSubmitted(false);
          setSubmitError("");
        }}
      />
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      noValidate
      className="border border-[#071A33]/10 bg-white"
    >
      {/* Form header */}
      <div className="border-b border-[#071A33]/10 px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
              Journey enquiry
            </p>

            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-[#071A33] sm:text-4xl">
              Tell us about your trip.
            </h2>
          </div>

          <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[#071A33]/25 sm:block">
            Step 01
          </span>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#071A33]/50">
          A few details are enough to get the conversation started. You can
          always figure out the finer details with us later.
        </p>
      </div>

      {/* Fields */}
      <ContactFormFields
        form={form}
        errors={errors}
        onChange={updateField}
      />

      {/* Error */}
      {submitError && (
        <div className="mx-6 mb-6 border border-[#F06A5B]/20 bg-[#F06A5B]/[0.06] px-4 py-3 sm:mx-8 lg:mx-10">
          <p className="text-sm leading-6 text-[#F06A5B]">{submitError}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col gap-5 border-t border-[#071A33]/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="max-w-sm text-xs leading-5 text-[#071A33]/35">
          Your details are only used to respond to this enquiry.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#071A33] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
              Sending...
            </>
          ) : (
            <>
              Send enquiry
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
"use client";

import type { ContactFormData } from "./ContactForm";

type Props = {
  form: ContactFormData;
  errors: Record<string, string>;
  onChange: (field: keyof ContactFormData, value: string) => void;
};

type FieldProps = {
  label: string;
  name: keyof ContactFormData;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
};

function Field({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/45"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`h-12 w-full border bg-[#FAF9F5] px-4 text-sm text-[#071A33] outline-none transition-all duration-300 placeholder:text-[#071A33]/25 focus:bg-white ${
          error
            ? "border-[#F06A5B]/50 focus:border-[#F06A5B]"
            : "border-[#071A33]/10 focus:border-[#087E8B]/50"
        }`}
      />

      {error && (
        <p
          id={`${name}-error`}
          className="mt-2 text-xs text-[#F06A5B]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactFormFields({
  form,
  errors,
  onChange,
}: Props) {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          value={form.name}
          placeholder="Aman Sharma"
          error={errors.name}
          onChange={(value) => onChange("name", value)}
        />

        <Field
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          placeholder="you@example.com"
          error={errors.email}
          onChange={(value) => onChange("email", value)}
        />

        <Field
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          value={form.phone}
          placeholder="+91 98765 43210"
          error={errors.phone}
          onChange={(value) => onChange("phone", value)}
        />

        <Field
          label="Where would you like to go?"
          name="destination"
          value={form.destination}
          placeholder="Shimla, Manali, Spiti..."
          error={errors.destination}
          onChange={(value) => onChange("destination", value)}
        />

        <Field
          label="Preferred travel dates"
          name="travelDates"
          value={form.travelDates}
          placeholder="e.g. 12–18 October"
          error={errors.travelDates}
          onChange={(value) => onChange("travelDates", value)}
        />

        <Field
          label="Travellers"
          name="travellers"
          value={form.travellers}
          placeholder="e.g. 2 adults"
          error={errors.travellers}
          onChange={(value) => onChange("travellers", value)}
        />
      </div>

      {/* Message */}
      <div className="mt-6">
        <label
          htmlFor="message"
          className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#071A33]/45"
        >
          Tell us about the journey
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={(event) => onChange("message", event.target.value)}
          placeholder="What are you imagining? Tell us about the kind of experience you'd like..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full resize-none border bg-[#FAF9F5] px-4 py-4 text-sm leading-6 text-[#071A33] outline-none transition-all duration-300 placeholder:text-[#071A33]/25 focus:bg-white ${
            errors.message
              ? "border-[#F06A5B]/50 focus:border-[#F06A5B]"
              : "border-[#071A33]/10 focus:border-[#087E8B]/50"
          }`}
        />

        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-[#F06A5B]">
            {errors.message}
          </p>
        )}
      </div>

      {/* Microcopy */}
      <div className="mt-5 flex items-start gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59E0B]" />

        <p className="text-xs leading-5 text-[#071A33]/35">
          Not sure about the dates or destination yet? That&apos;s completely
          fine — just tell us what you have in mind.
        </p>
      </div>
    </div>
  );
}
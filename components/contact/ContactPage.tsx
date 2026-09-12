"use client";

import ContactHero from "./ContactHero";
import ContactIntro from "./ContactIntro";
import ContactMethods from "./ContactMethods";
import ContactForm from "./ContactForm";
import ContactAside from "./ContactAside";
import ContactTrust from "./ContactTrust";
import ContactFAQ from "./ContactFAQ";
import ContactCTA from "./ContactCTA";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

type Props = {
  faqs?: FAQ[];
};

export default function ContactPage({ faqs = [] }: Props) {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <ContactHero />

      {/* Why contact */}
      <ContactIntro />

      {/* Contact channels */}
      <ContactMethods />

      {/* Main enquiry area */}
      <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 lg:mb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Let&apos;s make a plan
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:gap-10">
            <ContactForm />

            <ContactAside />
          </div>
        </div>
      </section>

      {/* Process / reassurance */}
      <ContactTrust />

      {/* Existing FAQ content */}
      <ContactFAQ faqs={faqs} />

      {/* Final CTA */}
      <ContactCTA />
    </main>
  );
}
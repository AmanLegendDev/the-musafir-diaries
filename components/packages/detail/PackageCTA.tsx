import Link from "next/link";

import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Star,
  MessageCircle,
} from "lucide-react";

interface PackageCTAProps {
  packageName: string;
}

export default function PackageCTA({
  packageName,
}: PackageCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Altitude Escapes, I'm interested in the "${packageName}" package. Please share more details.`
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 py-24 text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />

      <div className="relative container mx-auto px-6">

        <div className="mx-auto max-w-4xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">

            <Star className="h-4 w-4 fill-current" />

            Start Your Next Adventure

          </div>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Ready To Explore The Himalayas?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50">
            Secure your seat today and let our travel experts take
            care of everything. From planning to unforgettable
            experiences, we've got you covered.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href={`/booking?package=${encodeURIComponent(packageName)}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:scale-105"
            >
              Book Now

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href={`https://wa.me/919999999999?text=${whatsappMessage}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" />

              WhatsApp Us
            </Link>

            <Link
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <Phone className="h-5 w-5" />

              Call Now
            </Link>

          </div>

          {/* Trust Badges */}

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-emerald-100">

            <div className="flex items-center gap-2">

              <ShieldCheck className="h-5 w-5" />

              Secure Booking

            </div>

            <div className="flex items-center gap-2">

              <ShieldCheck className="h-5 w-5" />

              Best Price Guarantee

            </div>

            <div className="flex items-center gap-2">

              <ShieldCheck className="h-5 w-5" />

              24/7 Travel Support

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
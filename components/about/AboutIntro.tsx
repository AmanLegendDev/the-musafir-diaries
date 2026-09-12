"use client";

import { Compass, Heart, Mountain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          {/* Editorial label */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Who we are
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#087E8B]">
              <Mountain className="h-5 w-5" strokeWidth={1.4} />

              <span className="text-xs font-medium tracking-[0.08em]">
                Shimla, Himachal Pradesh
              </span>
            </div>
          </motion.div>

          {/* Main story */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/35">
              A travel business from the mountains
            </p>

            <h2 className="mt-4 max-w-5xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.3rem]">
              We believe a good journey is about more than{" "}
              <span className="text-[#087E8B]">getting somewhere.</span>
            </h2>

            <div className="mt-8 grid gap-7 lg:grid-cols-2 lg:gap-10">
              <p className="text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                The Musafir Diaries is a Shimla-based travel business focused
                on creating journeys through Himachal Pradesh. Our work has
                grown through real conversations, real trips, and the simple
                belief that travel should feel personal.
              </p>

              <p className="text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                We are still growing, and that is part of our story. Instead
                of trying to look bigger than we are, we want to build
                something meaningful — one journey, one experience, and one
                traveller at a time.
              </p>
            </div>

            {/* Principles */}
            <div className="mt-12 grid gap-px border border-[#071A33]/10 bg-[#071A33]/10 sm:grid-cols-3">
              <IntroPrinciple
                icon={Compass}
                number="01"
                title="Personal"
                text="Trips shaped around the people taking them."
              />

              <IntroPrinciple
                icon={Heart}
                number="02"
                title="Meaningful"
                text="More attention to experiences, not just itineraries."
              />

              <IntroPrinciple
                icon={Sparkles}
                number="03"
                title="Growing"
                text="Learning from every journey and every conversation."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntroPrinciple({
  icon: Icon,
  number,
  title,
  text,
}: {
  icon: typeof Compass;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between">
        <span className="text-[9px] font-semibold tracking-[0.14em] text-[#071A33]/20">
          {number}
        </span>

        <Icon
          className="h-4 w-4 text-[#087E8B]"
          strokeWidth={1.4}
        />
      </div>

      <h3 className="mt-7 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#071A33]/45">
        {text}
      </p>
    </div>
  );
}
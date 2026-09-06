"use client";
import Link from "next/link";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
export default function Hero() {

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const float: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
  return (
    <motion.section
  initial="hidden"
  animate="visible"
  className="relative overflow-hidden bg-[#F8FAFC] pt-20 lg:pt-16"
>

      {/* Background Glow */}

      <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#3BAEA0]/10 blur-[120px]" />

      <div className="absolute right-[-220px] bottom-[-220px] h-[520px] w-[520px] rounded-full bg-[#0F4C81]/10 blur-[150px]" />

      <div className="mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl items-center px-6 py-10 lg:px-10">

        <div className="grid w-full items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}

         <motion.div
 initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.3 }}
variants={fadeUp}
  className="flex flex-col justify-center"
>

  {/* Badge */}

  <div className="mb-6 inline-flex w-fit items-center rounded-full border border-[#3BAEA0]/20 bg-white px-4 py-2 shadow-sm">

    <span className="mr-2 text-lg">🏔</span>

    <span className="text-sm font-semibold tracking-wide text-[#0F4C81]">
      Premium Himalayan Experiences
    </span>

  </div>

  {/* Heading */}

  <h1 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl xl:text-7xl">

    Escape Beyond

    <br />

    <span className="bg-gradient-to-r from-[#0F4C81] via-[#1F7AB8] to-[#3BAEA0] bg-clip-text text-transparent">

      The Ordinary

    </span>

  </h1>

  {/* Description */}

  <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">

    Discover handcrafted journeys through the breathtaking Himalayas.
    From peaceful mountain escapes to thrilling adventures,
    every trip is thoughtfully designed to create unforgettable memories.

  </p>

  {/* CTA */}

  <div className="mt-10 flex flex-wrap gap-4">

    <Link href="/booking">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="rounded-2xl bg-[#0F4C81] px-8 py-4 font-semibold text-white shadow-lg transition cursor-pointer"
  >
    Book Your Trip
  </motion.button>
</Link>

 <Link href="/inquiry">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-lg transition hover:border-[#3BAEA0] hover:text-[#0F4C81]"
  >
    Plan My Journey
  </motion.button>
</Link>



  </div>
  <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-600">

  <div className="flex items-center gap-2">
    <span className="text-[#3BAEA0]">✔</span>
    Local Expert Guides
  </div>

  <div className="flex items-center gap-2">
    <span className="text-[#3BAEA0]">✔</span>
    Luxury Stays
  </div>

  <div className="flex items-center gap-2">
    <span className="text-[#3BAEA0]">✔</span>
    24×7 Support
  </div>

</div>

</motion.div>

          {/* RIGHT */}

        {/* RIGHT */}

<motion.div
  variants={fadeUp}
  className="relative flex justify-center lg:justify-end"
>
  {/* Top Glow */}

  <div className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-[#3BAEA0]/20 blur-3xl" />

  <div className="absolute -bottom-10 left-10 h-52 w-52 rounded-full bg-[#0F4C81]/15 blur-3xl" />

  {/* Image */}

 <motion.div
  variants={fadeUp}
  whileHover={{
    scale: 1.02,
  }}
  className="relative overflow-hidden rounded-[36px] shadow-[0_30px_80px_rgba(15,76,129,0.18)]"
>

    <Image
      src="/images/hero/hero-main.webp"
      alt="Altitude Escapes Hero"
      width={900}
      height={1000}
      priority
      className="h-[400px]
sm:h-[500px]
lg:h-[690px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px] lg:h-[690px] lg:w-[560px] rounded-tl-[42px]
rounded-tr-[42px]
rounded-bl-[42px]
rounded-br-[48px]
sm:rounded-br-[60px]
lg:rounded-br-[90px]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/25 via-transparent to-transparent" /> 

</motion.div>

  {/* Rating Card */}

<motion.div
  variants={float}
  animate="animate"
className="
absolute
left-0
top-20
sm:left-4
sm:top-20
lg:left-[-20px]
lg:top-12
rounded-3xl
border
border-white/40
bg-white/85
px-5
py-4
shadow-2xl

">
    <p className="text-xs uppercase tracking-widest text-slate-500">
      Customer Rating
    </p>

    <h3 className="mt-1 text-3xl font-bold text-[#0F4C81]">
      ★ 4.9
    </h3>

    <p className="text-sm text-slate-500">
      Based on 2,000+ reviews
    </p>

</motion.div>

  {/* Travelers Card */}

<motion.div
  variants={float}
  animate="animate"
  transition={{
    delay: 0.5,
  }}
  className="absolute bottom-10 left-0
bottom-6
sm:left-2
lg:left-[-30px] rounded-3xl border border-white/40 bg-white/85 px-6 py-5 shadow-2xl backdrop-blur-xl"
>
    <h3 className="text-4xl font-bold text-[#0F4C81]">
      5000+
    </h3>

    <p className="mt-1 text-sm text-slate-600">
      Happy Travelers
    </p>

 </motion.div>

  {/* Secure Booking */}

<motion.div
  variants={float}
  animate="animate"
  transition={{
    delay: 1,
  }}
  className="absolute bottom-16 right-0
bottom-10
sm:right-2
lg:right-[-20px] rounded-3xl border border-white/40 bg-[#0F4C81] px-6 py-5 text-white shadow-2xl"
>
    <h3 className="text-2xl font-bold">
      100%
    </h3>

    <p className="text-sm opacity-90">
      Secure Booking
    </p>

  </motion.div>
  <motion.div
  variants={float}
  animate="animate"
  transition={{ delay: 1.5 }}
  className="absolute right-0 top-8 rounded-full border border-white/40 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-xl"
>
  <p className="text-sm font-semibold text-slate-700">
    📍 Shimla • Manali • Spiti
  </p>
</motion.div>

</motion.div>

        </div>

      </div>
<div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">

  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="flex flex-col items-center"
  >

    <span className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">
      Scroll
    </span>

    <div className="h-10 w-6 rounded-full border border-slate-300">

      <motion.div
        animate={{ y: [2, 18, 2] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="mx-auto mt-1 h-2 w-2 rounded-full bg-[#0F4C81]"
      />

    </div>

  </motion.div>

</div>
   </motion.section>
  );
}
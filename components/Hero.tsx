"use client";

import { motion, type Variants } from "framer-motion";
import SearchBar from "@/components/SearchBar";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy">
      <motion.div
        aria-hidden="true"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 20, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(30,79,163,0.55), transparent 55%), radial-gradient(circle at 80% 30%, rgba(201,169,97,0.18), transparent 45%), linear-gradient(180deg, #0b1f3a 0%, #0a1730 55%, #061024 100%)",
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full text-navy-light/40"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 224 L120 192 L260 240 L400 160 L560 220 L720 140 L880 210 L1040 170 L1200 230 L1320 190 L1440 220 L1440 320 L0 320 Z"
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold"
          >
            North &amp; West Vancouver, BC
          </motion.p>
          <motion.h1
            variants={item}
            className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Find your place on the North Shore
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-white/70">
            Sunny Chadha helps buyers and sellers navigate the North and West
            Vancouver real estate market with clear advice and hands-on
            guidance, from first search to closing day.
          </motion.p>
          <motion.div variants={item} className="mt-9">
            <SearchBar dark />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

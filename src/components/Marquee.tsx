"use client";

import { motion } from "framer-motion";

export default function Marquee({
  items,
  duration = 26,
}: {
  items: string[];
  duration?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-6">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-3xl uppercase tracking-tight text-fg-dim md:text-5xl"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

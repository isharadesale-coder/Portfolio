"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ImageTrail from "./ImageTrail";

const ease = [0.22, 1, 0.36, 1] as const;

// Index 0 is the name; the rest describe her and cycle.
const PHRASES = [
  "Ishika Desale",
  "Creative",
  "Visionary",
  "Designer",
  "Storyteller",
  "Strategist",
  "Empathetic",
  "Maker",
  "User-Centric",
];

const TYPE_MS = 95; // per character when typing
const DELETE_MS = 45; // per character when backspacing
const HOLD_FULL_MS = 1500; // pause once a word is fully typed
const HOLD_EMPTY_MS = 350; // pause before typing the next word

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [idx, setIdx] = useState(0); // which phrase
  const [sub, setSub] = useState(0); // characters currently shown
  const [deleting, setDeleting] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Typewriter state machine: type → hold → backspace → next → repeat.
  useEffect(() => {
    if (reduced) return;
    const phrase = PHRASES[idx];

    // Finished typing a word → hold, then start deleting.
    if (!deleting && sub === phrase.length) {
      const t = setTimeout(() => setDeleting(true), HOLD_FULL_MS);
      return () => clearTimeout(t);
    }
    // Finished deleting → pause, then advance to the next word.
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIdx((v) => (v + 1) % PHRASES.length);
      }, HOLD_EMPTY_MS);
      return () => clearTimeout(t);
    }
    // Otherwise tick one character forward/back.
    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, idx, reduced]);

  const text = reduced ? PHRASES[0] : PHRASES[idx].slice(0, sub);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <ImageTrail />

      <motion.div
        style={{ opacity: fade, y }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        {/* Typewriter name → role cycle */}
        <div className="flex h-[1.05em] items-center justify-center">
          <h1 className="font-geist whitespace-nowrap text-[clamp(2.6rem,10vw,11rem)] font-semibold leading-none tracking-[-0.025em]">
            {text}
            <span
              aria-hidden
              className="caret ml-[0.06em] inline-block text-accent"
            >
              |
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="mt-16 max-w-xl text-base leading-relaxed text-fg-dim md:mt-24 md:text-lg"
        >
          An Australia-based product &amp; interaction designer crafting sleek,
          motion-led brand and digital experiences — from the first concept to
          the final pixel.
        </motion.p>
      </motion.div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [i, setI] = useState(0);
  const [intro, setIntro] = useState(true);
  const introPlayed = useRef(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cinematic entry: hold the name, then begin cycling.
  useEffect(() => {
    if (reduced) {
      setIntro(false);
      return;
    }
    const t = setTimeout(() => {
      setIntro(false);
      setI(1);
    }, 2900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Role cycle (only after the intro has finished).
  useEffect(() => {
    if (intro || reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % PHRASES.length), 1800);
    return () => clearTimeout(t);
  }, [i, intro, reduced]);

  const firstIntro = i === 0 && !introPlayed.current && !reduced;

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
        {/* Cinematic name → role cycle */}
        <div className="flex h-[1.05em] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={i}
              initial={
                firstIntro
                  ? { clipPath: "inset(0 100% 0 0)", scale: 0.72, opacity: 1 }
                  : { opacity: 0, y: 34, filter: "blur(10px)" }
              }
              animate={
                firstIntro
                  ? { clipPath: "inset(0 0% 0 0)", scale: 1, opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={{ opacity: 0, y: -34, filter: "blur(10px)" }}
              transition={
                firstIntro
                  ? {
                      clipPath: { duration: 1.05, ease },
                      scale: { duration: 0.7, ease, delay: 1 },
                    }
                  : { duration: 0.6, ease }
              }
              onAnimationComplete={() => {
                if (firstIntro) introPlayed.current = true;
              }}
              className="font-geist whitespace-nowrap text-[clamp(2.6rem,10vw,11rem)] font-semibold leading-none tracking-[-0.025em]"
            >
              {PHRASES[i]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: reduced ? 0.2 : 2 }}
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

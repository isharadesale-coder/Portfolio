"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

// Art / photos in final grid order (art1 = top-left … art12 = bottom-right).
const sources = [
  "/art-corner/art1.webp",
  "/art-corner/art2.webp",
  "/art-corner/art3.webp",
  "/art-corner/art4.webp",
  "/art-corner/art5.webp",
  "/art-corner/art6.webp",
  "/art-corner/art7.webp",
  "/art-corner/art8.webp",
  "/art-corner/art9.webp",
  "/art-corner/art10.webp",
  "/art-corner/art11.webp",
  "/art-corner/art12.webp",
];

// Per-card starting 3D tilt.
const TILT = [
  { rx: 32, ry: -30 },
  { rx: -26, ry: 26 },
  { rx: 24, ry: -34 },
  { rx: -32, ry: 22 },
  { rx: 28, ry: -22 },
  { rx: -22, ry: 32 },
  { rx: 34, ry: -26 },
  { rx: -28, ry: 24 },
  { rx: 22, ry: -32 },
  { rx: -30, ry: 28 },
  { rx: 27, ry: -24 },
  { rx: -24, ry: 30 },
];
// Random-ish start offsets (vw / vh) — cards begin scattered across the
// viewport, then fly in to their grid cell as you scroll.
const SCATTER = [
  { x: -42, y: -34 },
  { x: 30, y: -44 },
  { x: 10, y: -50 },
  { x: 48, y: -14 },
  { x: -50, y: 4 },
  { x: 44, y: 22 },
  { x: -34, y: 40 },
  { x: 6, y: 50 },
  { x: -14, y: 44 },
  { x: 50, y: 46 },
  { x: -48, y: -46 },
  { x: 26, y: 10 },
];

type Card = {
  src: string;
  sx: number; // start x offset from grid cell (vw)
  sy: number; // start y offset from grid cell (vh)
  rx: number;
  ry: number;
  z: number;
};

const cards: Card[] = sources.map((src, i) => ({
  src,
  sx: SCATTER[i].x,
  sy: SCATTER[i].y,
  rx: TILT[i].rx,
  ry: TILT[i].ry,
  z: (i % 3) + 1,
}));

function GlimpseCard({ card, p }: { card: Card; p: MotionValue<number> }) {
  // Start scattered + tilted in 3D + small; fly in and flatten to the grid cell.
  const x = useTransform(p, [0, 0.85], [`${card.sx}vw`, "0vw"]);
  const y = useTransform(p, [0, 0.85], [`${card.sy}vh`, "0vh"]);
  const z = useTransform(p, [0, 0.85], [-560, 0]);
  const rotateX = useTransform(p, [0, 0.85], [card.rx, 0]);
  const rotateY = useTransform(p, [0, 0.85], [card.ry, 0]);
  const scale = useTransform(p, [0, 0.85], [0.5, 1]);
  const opacity = useTransform(p, [0, 0.12, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        scale,
        opacity,
        zIndex: card.z,
        transformPerspective: 1000,
      }}
      className="overflow-hidden bg-bg-card shadow-[0_30px_60px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt=""
        className="block aspect-[4/5] w-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

export default function AGlimpse() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Title leads, then recedes as the grid takes over.
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.86]);
  // Derive opacity from scale (which tracks reliably) so the title fully clears
  // by the time the grid settles.
  const titleOpacity = useTransform(titleScale, [0.9, 1], [0, 1]);

  return (
    <section ref={ref} id="glimpse" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Final grid: 4 cols, uniform fixed gap so spacing is consistent at any size */}
        <div
          className="grid grid-cols-4"
          style={{
            gap: "clamp(12px,1.4vw,20px)",
            // Sized by BOTH axes so the 4×3 of 4:5 portraits grows as large as
            // the section can fit — width caps on wide screens, height caps on short ones.
            gridTemplateColumns: "repeat(4, min(21vw, 24svh))",
          }}
        >
          {cards.map((c) => (
            <GlimpseCard key={c.src} card={c} p={scrollYProgress} />
          ))}
        </div>

        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="font-geist text-[clamp(3rem,11vw,9rem)] font-semibold leading-none tracking-[-0.03em]">
            My Art Corner
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

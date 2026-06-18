"use client";

import { useEffect, useRef } from "react";

const IMAGES = [
  "/projects/gridglow/cover.webp",
  "/projects/focusmate/cover.webp",
  "/projects/gridglow/screens/brownout-map.webp",
  "/projects/focusmate/mockups/session.webp",
  "/projects/moha/screens/artwork.webp",
  "/projects/focusmate/assets/stage-37.webp",
  "/projects/gridglow/assets/hub-photo.webp",
  "/projects/focusmate/hero-mockup.webp",
  "/projects/moha/screens/artist.webp",
  "/projects/gridglow/assets/mascot.webp",
  "/projects/moha/cover.webp",
  "/projects/moha/assets/mockup-merch.webp",
];

/**
 * Spawns a trail of project thumbnails that follow the cursor across the hero
 * (Billie-style). Attaches to its parent element; skips touch / reduced-motion.
 */
export default function ImageTrail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Preload
    IMAGES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    let lastX = 0;
    let lastY = 0;
    let primed = false;
    let idx = 0;
    const STEP = 90; // px of travel between spawns

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!primed) {
        primed = true;
        lastX = x;
        lastY = y;
        return;
      }
      if (Math.hypot(x - lastX, y - lastY) < STEP) return;
      lastX = x;
      lastY = y;

      const img = document.createElement("img");
      img.src = IMAGES[idx % IMAGES.length];
      idx++;
      img.alt = "";
      img.className = "trail-img";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.setProperty("--rot", `${(Math.random() * 16 - 8).toFixed(1)}deg`);
      layer.appendChild(img);

      requestAnimationFrame(() => img.classList.add("trail-in"));
      window.setTimeout(() => {
        img.classList.remove("trail-in");
        img.classList.add("trail-out");
      }, 480);
      window.setTimeout(() => img.remove(), 1100);
    };

    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    />
  );
}

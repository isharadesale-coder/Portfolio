"use client";

import { useEffect, useRef, useState } from "react";

/**
 * See-through "view project" cursor — an outlined circle with an arrow that
 * follows the pointer and scales in over [data-cursor-view] elements.
 * Uses mix-blend-mode so the ring/arrow always contrast against the image.
 */
export default function WorkCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest("[data-cursor-view]")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
    >
      <div
        style={{ mixBlendMode: "difference" }}
        className={`flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17 L17 7" />
          <path d="M8 7 H17 V16" />
        </svg>
      </div>
    </div>
  );
}

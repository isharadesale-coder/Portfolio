"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const STATEMENT =
  "I'm a product and interaction designer who cares about the small moments — the pause before a transition, the wording on a single button. I pair editorial typography with motion that has weight and intent, designing work that feels calm, considered, and quietly alive.";

const services = [
  "Product Design",
  "UX / UI Design",
  "Interaction Design",
  "Design Strategy",
  "Prototyping",
  "Design Systems",
];

// Small hand-drawn doodle icons (line style) used in place of emojis.
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    plane: <path {...p} d="M2 13 L22 4 L13 22 L11 14 L2 13 Z M11 14 L16 8" />,
    camera: (
      <>
        <path {...p} d="M3 8 h4 l1.5-2.5 h7 L18 8 h3 v11 H3 Z" />
        <circle {...p} cx="12" cy="13.5" r="3.4" />
      </>
    ),
    car: (
      <>
        <path {...p} d="M2 16 h20 M4 16 c0-3 3-4 6-4 h3 l4 2.5 h4" />
        <circle {...p} cx="7.5" cy="17.5" r="1.7" />
        <circle {...p} cx="16.5" cy="17.5" r="1.7" />
      </>
    ),
    pencil: <path {...p} d="M4 20 L16 8 L19 11 L7 23 Z M16 8 L18 5 L21 8 L19 11" />,
    paw: (
      <>
        <path {...p} d="M8.5 15.5 c0-2.2 2-3.5 3.5-3.5 s3.5 1.3 3.5 3.5 c0 1.8-1.7 2.6-3.5 2.6 s-3.5-.8-3.5-2.6 Z" />
        <circle {...p} cx="6.5" cy="10" r="1.4" />
        <circle {...p} cx="10" cy="7.5" r="1.4" />
        <circle {...p} cx="14" cy="7.5" r="1.4" />
        <circle {...p} cx="17.5" cy="10" r="1.4" />
      </>
    ),
    tree: (
      <>
        <path {...p} d="M12 22 V13 M12 16 l-3-2.5 M12 14 l3-2.5" />
        <circle {...p} cx="12" cy="8" r="5" />
      </>
    ),
    film: (
      <>
        <path {...p} d="M3 9 h18 v11 H3 Z" />
        <path {...p} d="M3 9 l4-4 3 4 M10 9 l4-4 3 4 M17 9 l3-4" />
      </>
    ),
    shuttle: (
      <>
        <path {...p} d="M12 22 a3 3 0 0 1-3-3 h6 a3 3 0 0 1-3 3 Z" />
        <path {...p} d="M9 19 L6 7 M15 19 L18 7 M12 19 V6" />
        <path {...p} d="M6 7 a6.5 3.2 0 0 1 12 0" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

// Playful facts revealed around the portrait on hover.
const facts: {
  text: string;
  icon: string;
  wrap: string; // position of the whole fact
  arrow: string; // position + rotation of the arrow
}[] = [
  {
    text: "loves to travel",
    icon: "plane",
    wrap: "-top-16 -left-3 -translate-x-full text-right",
    arrow: "left-0 top-0 rotate-[216deg]",
  },
  {
    text: "big F1 fan",
    icon: "car",
    wrap: "top-1/2 -left-3 -translate-x-full -translate-y-1/2 text-right",
    arrow: "left-0 top-1/2 rotate-180",
  },
  {
    text: "plays badminton",
    icon: "shuttle",
    wrap: "-bottom-16 -left-3 -translate-x-full text-right",
    arrow: "left-0 top-full rotate-[144deg]",
  },
  {
    text: "takes pictures & videos",
    icon: "camera",
    wrap: "-top-16 -right-3 translate-x-full text-left",
    arrow: "left-full top-0 rotate-[324deg]",
  },
  {
    text: "draws",
    icon: "pencil",
    wrap: "top-1/2 -right-3 -translate-y-1/2 translate-x-full text-left",
    arrow: "left-full top-1/2 rotate-0",
  },
  {
    text: "explores cinematic masterpieces",
    icon: "film",
    wrap: "-bottom-16 -right-3 translate-x-full text-left",
    arrow: "left-full top-full rotate-[36deg]",
  },
  {
    text: "likes climbing trees",
    icon: "tree",
    wrap: "-top-20 left-1/2 -translate-x-1/2 text-center",
    arrow: "left-1/2 top-0 rotate-[270deg]",
  },
  {
    text: "animal lover — has 2 pets",
    icon: "paw",
    wrap: "-bottom-20 left-1/2 -translate-x-1/2 text-center",
    arrow: "left-1/2 top-full rotate-90",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Register here too — child effects run before the parent SmoothScroll
    // effect, so without this the scrollTrigger is ignored and the words
    // animate to full opacity immediately on load.
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      // Dim every word first so they all start faint, then scrub them to
      // full opacity in reading order as the user scrolls through.
      gsap.set(words, { opacity: 0.18 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          // Begin only once the heading is well into view, and tie the
          // reveal to scroll through the section (not as it peeks in).
          start: "top 62%",
          end: "bottom 38%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, ref);

    // The Work section's images/videos load after mount and push this
    // section down, which leaves ScrollTrigger's start/end stale (the reveal
    // looks "already done"). Recompute positions once everything settles.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="shell py-24 md:py-36">
      <p className="eyebrow mb-10 md:mb-14">About</p>

      {/* Half-and-half: statement | portrait */}
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div ref={ref}>
          <h2 className="font-geist text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl lg:text-[2.5rem] lg:leading-[1.24]">
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i} className="about-word inline-block">
                {w}&nbsp;
              </span>
            ))}
          </h2>
        </div>

        {/* Portrait with playful hover doodles */}
        <div className="flex justify-center xl:py-16">
          <div className="group relative">
            <div className="relative w-[240px] overflow-hidden rounded-[1.8rem] ring-1 ring-line transition-transform duration-500 group-hover:-rotate-1 sm:w-[300px] lg:w-[320px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/headshot.webp"
                alt="Ishika Desale"
                className="block w-full select-none"
                draggable={false}
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden xl:block"
            >
              {/* labels + doodle icons */}
              {facts.map((f, i) => (
                <div
                  key={f.text}
                  className={`absolute flex w-max max-w-[8.5rem] items-center gap-2 font-hand text-[1.5rem] leading-[1.05] text-fg opacity-0 transition-all duration-500 group-hover:opacity-100 ${f.wrap}`}
                  style={{ transitionDelay: `${i * 60 + 120}ms` }}
                >
                  <span>{f.text}</span>
                  <Icon name={f.icon} className="h-10 w-10 shrink-0 text-fg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-line pt-12 md:mt-28 xl:mt-40">
        <Reveal>
          <p className="eyebrow mb-7">Services</p>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s}
                className="flex items-center gap-4 border-b border-line py-3.5 font-geist text-xl text-fg-dim transition-colors hover:text-fg md:text-2xl"
              >
                <span className="font-geist text-sm text-accent">↳</span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

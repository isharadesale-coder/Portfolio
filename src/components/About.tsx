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
      <p className="eyebrow mb-10">About</p>

      <div ref={ref}>
        <h2 className="font-geist text-2xl font-medium leading-[1.25] tracking-tight sm:text-4xl md:text-[3.2rem] md:leading-[1.18]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className="about-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </h2>
      </div>

      <div className="mt-16 border-t border-line pt-12 md:mt-24">
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

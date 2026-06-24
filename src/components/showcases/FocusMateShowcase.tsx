"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "@/lib/types";

const BASE = "/projects/focusmate";
const ease = [0.22, 1, 0.36, 1] as const;
const PROTOTYPE_URL =
  "https://www.figma.com/proto/2wBTytDCDGRTpgF9MkKV1a/Ishara-Ishika-_WA?page-id=182%3A120&node-id=519-72&viewport=64%2C-354%2C0.26&t=tPlcQiXU4dw2Pmxk-1&scaling=min-zoom&content-scaling=fixed";

/* ---------- Small building blocks ---------- */

/** Renders a pre-framed phone mockup (already includes the device frame). */
function Device({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`w-full select-none drop-shadow-[0_45px_90px_-30px_rgba(0,0,0,0.8)] ${className}`}
      draggable={false}
    />
  );
}

/** Scroll-linked vertical parallax wrapper. */
function Parallax({
  children,
  speed = 0.2,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 140, -speed * 140]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className="font-dmsans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#9bb07e]"
    >
      {children}
    </motion.p>
  );
}

/* ---------- Feature section ---------- */

type Feature = {
  kicker: string;
  title: string;
  italic: string;
  body: string;
  bullets: string[];
  screens: { src: string; alt: string }[];
  bg: string;
};

const features: Feature[] = [
  {
    kicker: "Feature 01",
    title: "Onboarding &",
    italic: "study profile",
    body: "Sign up in 30 seconds. Set your field, expertise level and partner preferences — the matcher uses this to pair you with the right person every time.",
    bullets: [
      "Field of study — Design, Law, Medicine & more",
      "Expertise level — Beginner, Mid or Expert",
      "Preferences — camera on, same field, mic-off",
    ],
    screens: [
      { src: `${BASE}/mockups/splash.webp`, alt: "Splash screen" },
      { src: `${BASE}/mockups/field.webp`, alt: "Field of study" },
      { src: `${BASE}/mockups/level.webp`, alt: "Expertise level" },
    ],
    bg: "#11160c",
  },
  {
    kicker: "Feature 02",
    title: "Find your",
    italic: "focus partner",
    body: "Match by field and level, or pull a friend straight in with a link. A live radar searches the pool; if there's no exact match, you can pair with anyone else who's also showing up.",
    bullets: [
      "Smart matching by field + level",
      "Invite a friend directly — no matching needed",
      "Random pairing pool as a fallback",
    ],
    screens: [
      { src: `${BASE}/mockups/home.webp`, alt: "Home" },
      { src: `${BASE}/mockups/searching.webp`, alt: "Searching" },
      { src: `${BASE}/mockups/partner.webp`, alt: "Partner preview" },
    ],
    bg: "#161e0d",
  },
  {
    kicker: "Feature 03",
    title: "The focus",
    italic: "session",
    body: "Pick 30, 45 or 60 minutes. Camera on, mic muted by default. A live timer counts down for both partners at once — social presence, without the noise.",
    bullets: [
      "Live dual timer for both partners",
      "Mid-session discussion request — partner must accept",
      "5-minute break unlocks audio & chat",
    ],
    screens: [
      { src: `${BASE}/mockups/duration.webp`, alt: "Session duration setup" },
      { src: `${BASE}/mockups/session.webp`, alt: "Live session" },
      { src: `${BASE}/mockups/discussion-req.webp`, alt: "Discussion request" },
    ],
    bg: "#192212",
  },
  {
    kicker: "Feature 04",
    title: "Break, rate",
    italic: "& reflect",
    body: "After each session a short break opens, then both partners rate each other's focus 1–5. The averaged score is honest — neither side sees the other's rating — and it drives how much of your city gets built.",
    bullets: [
      "Scores averaged & private",
      "1 = foundation · 3 = halfway · 5 = completed",
      "Optional note to explain your rating",
    ],
    screens: [
      { src: `${BASE}/mockups/break.webp`, alt: "Break time" },
      { src: `${BASE}/mockups/reflection.webp`, alt: "Rate partner" },
      { src: `${BASE}/mockups/score.webp`, alt: "Growth score" },
    ],
    bg: "#161d0d",
  },
];

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: feature.bg }}
    >
      <div
        className={`shell grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Text */}
        <div
          className={`md:sticky md:top-32 md:self-start md:max-w-xl ${
            reversed ? "md:ml-auto" : ""
          }`}
        >
          <Eyebrow>{feature.kicker}</Eyebrow>
          <h2 className="mt-5 font-playfair text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            {feature.title}{" "}
            <span className="font-playfair font-medium italic text-[#9bb07e]">
              {feature.italic}
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-fg-dim md:text-lg">
            {feature.body}
          </p>
          <ul className="mt-8 space-y-3">
            {feature.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-sm text-fg-dim md:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9bb07e]" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Phones */}
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {feature.screens.map((s, i) => (
            <Parallax
              key={s.src}
              speed={0.12 + i * 0.16}
              className={
                i === 1
                  ? "w-[34%] max-w-[230px] -translate-y-6"
                  : "w-[30%] max-w-[200px] translate-y-4"
              }
            >
              <Device src={s.src} alt={s.alt} />
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Scroll-driven construction sequence ---------- */

const stages = [
  { src: `${BASE}/assets/stage-34.webp`, label: "Construction started", pct: "25%" },
  { src: `${BASE}/assets/stage-35.webp`, label: "Halfway there", pct: "50%" },
  { src: `${BASE}/assets/stage-36.webp`, label: "Almost done", pct: "80%" },
  { src: `${BASE}/assets/stage-37.webp`, label: "Construction completed", pct: "100%" },
];

function BuildSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Discrete active stage — exactly ONE image is shown at a time, swapped
  // sharply with no cross-dissolve (inactive images use display:none).
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    setIdx(
      Math.max(0, Math.min(stages.length - 1, Math.floor(v * stages.length))),
    );
  });

  const barWidth = useTransform(p, [0.03, 0.97], ["6%", "100%"]);

  // Per-stage size: the first stages sit at a consistent proportion; the
  // final completed city grows to fill the screen.
  const stageScale = [
    "scale(0.82)",
    "scale(0.9)",
    "scale(0.97)",
    "scale(1.05)",
  ];

  return (
    <section ref={ref} className="relative h-[420vh] bg-[#171f10]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* warm glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,178,120,0.5), transparent 65%)",
          }}
        />

        <div className="shell relative z-20 w-full text-center">
          <Eyebrow>The payoff</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-3xl font-playfair text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Every focus session{" "}
            <span className="font-playfair font-medium italic text-[#cbb274]">
              builds a city
            </span>
          </h2>
        </div>

        {/* single sharp building image */}
        <div className="relative z-10 mt-2 flex h-[58vh] w-full max-w-6xl items-center justify-center md:h-[64vh]">
          {stages.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={s.src}
              alt={s.label}
              draggable={false}
              style={{
                display: i === idx ? "block" : "none",
                transform: stageScale[i],
              }}
              className="absolute inset-0 m-auto max-h-full max-w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
            />
          ))}
        </div>

        {/* progress + label */}
        <div className="relative z-20 mt-2 w-full max-w-md px-6">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ width: barWidth }}
              className="h-full rounded-full bg-[#cbb274]"
            />
          </div>
          <p className="mt-4 text-center font-dmsans text-sm uppercase tracking-[0.18em] text-[#cbb274]">
            {stages[idx].label} · {stages[idx].pct}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main showcase ---------- */

export default function FocusMateShowcase({
  project,
  next,
  prev,
}: {
  project: Project;
  next: { title: string; slug: string };
  prev: { title: string; slug: string };
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroPhoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="font-dmsans bg-[#11160c] text-fg">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-28 pb-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, #2a3a1e 0%, #11160c 60%)",
          }}
        />
        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/logo.webp`}
            alt="FocusMate logo"
            className="mb-7 h-16 w-16 rounded-[1.1rem] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] md:h-20 md:w-20"
          />
          <Eyebrow>Self-initiated · Interaction Design</Eyebrow>
          <h1 className="mt-6 font-playfair text-[17vw] font-bold leading-none tracking-tight md:text-[9.5rem]">
            Focus<span className="font-medium italic text-[#9bb07e]">Mate</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-dim">
            {project.summary}
          </p>
        </motion.div>

        <motion.div
          style={{ y: heroPhoneY }}
          className="relative z-10 mt-12 w-[82%] max-w-[480px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/hero-mockup.webp`}
            alt="FocusMate app — result and building selection screens"
            className="w-full drop-shadow-[0_55px_90px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </motion.div>
      </section>

      {/* META BAR */}
      <section className="border-y border-white/10 bg-[#11160c]">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-8">
          {[
            { label: "Role", value: project.role },
            { label: "Type", value: "Mobile app concept" },
            { label: "Discipline", value: project.category },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-dmsans text-[0.66rem] uppercase tracking-[0.2em] text-muted">
                {m.label}
              </p>
              <p className="mt-2 font-dmsans text-sm">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="shell py-28 md:py-40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-4xl text-center font-playfair text-2xl font-medium leading-[1.35] tracking-tight md:text-[2.6rem] md:leading-[1.3]"
        >
          Studying alone is easy to abandon — and most productivity tools don&apos;t
          actually keep you{" "}
          <span className="text-[#9bb07e]">accountable</span>. FocusMate pairs you
          with a partner, then turns every completed session into visible{" "}
          <span className="text-[#9bb07e]">progress you can see</span>.
        </motion.h2>
      </section>

      {/* FEATURES */}
      {features.map((f, i) => (
        <FeatureSection key={f.kicker} feature={f} index={i} />
      ))}

      {/* BUILD SEQUENCE */}
      <BuildSequence />

      {/* SKYLINE CLOSER */}
      <section className="relative overflow-hidden bg-[#11160c] py-28 md:py-40">
        <div className="shell grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The reward</Eyebrow>
            <h2 className="mt-5 font-playfair text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
              A skyline that{" "}
              <span className="font-playfair font-medium italic text-[#9bb07e]">
                proves you showed up
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-dim md:text-lg">
              Buildings rise from real focus. Keep your streak and landmarks
              unlock; miss sessions and the city stalls. Your progress is no
              longer a number — it&apos;s a place.
            </p>
            <div className="mt-10 flex items-end justify-start gap-6">
              {[
                `${BASE}/assets/building-a.webp`,
                `${BASE}/assets/building-c.webp`,
                `${BASE}/assets/building-b.webp`,
              ].map((src, i) => (
                <Parallax key={src} speed={0.1 + i * 0.1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-28 w-auto object-contain drop-shadow-xl md:h-36"
                  />
                </Parallax>
              ))}
            </div>
          </div>
          <Parallax speed={0.18} className="mx-auto w-[70%] max-w-[300px]">
            <Device src={`${BASE}/mockups/skyline.webp`} alt="City skyline" />
          </Parallax>
        </div>
      </section>

      {/* PROTOTYPE CTA */}
      <section className="relative overflow-hidden bg-[#11160c] py-28 text-center md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(155,176,126,0.5), transparent 65%)",
          }}
        />
        <div className="shell relative z-10">
          <Eyebrow>Try it yourself</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl font-playfair text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
            Walk through the full{" "}
            <span className="font-playfair font-medium italic text-[#9bb07e]">
              interactive prototype
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-fg-dim">
            Every screen and flow, clickable end to end in Figma.
          </p>
          <a
            href={PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#e9e0cf] px-8 py-4 font-dmsans text-sm font-bold uppercase tracking-[0.16em] !text-[#11160c] transition-all duration-300 hover:bg-[#9bb07e] hover:tracking-[0.2em]"
          >
            Open the prototype
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* PREV / NEXT PROJECT */}
      <nav className="border-t border-white/10">
        <div className="shell grid sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex items-center gap-4 py-12 sm:py-16"
          >
            <span className="font-playfair text-3xl text-muted transition-transform group-hover:-translate-x-2 group-hover:text-[#9bb07e] md:text-5xl">
              ←
            </span>
            <span>
              <span className="block font-dmsans text-[0.68rem] uppercase tracking-[0.28em] text-muted">
                Previous
              </span>
              <span className="mt-2 block font-playfair text-3xl font-semibold italic transition-colors group-hover:text-[#9bb07e] md:text-5xl">
                {prev.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-12 text-right sm:border-l sm:border-white/10 sm:py-16 sm:pl-8"
          >
            <span>
              <span className="block font-dmsans text-[0.68rem] uppercase tracking-[0.28em] text-muted">
                Next
              </span>
              <span className="mt-2 block font-playfair text-3xl font-semibold italic transition-colors group-hover:text-[#9bb07e] md:text-5xl">
                {next.title}
              </span>
            </span>
            <span className="font-playfair text-3xl text-muted transition-transform group-hover:translate-x-2 group-hover:text-[#9bb07e] md:text-5xl">
              →
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

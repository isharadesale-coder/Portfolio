"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const BASE = "/projects/bundle";
const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- building blocks ---------- */

// One consistent phone frame used for both screens and videos.
function Phone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[440/956] overflow-hidden rounded-[1.7rem] bg-black p-[5px] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-black">
        {children}
      </div>
    </div>
  );
}

function PhoneScreen({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Phone className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </Phone>
  );
}

// The prototype recordings already include their own device frame, so we show
// them as-is — no extra CSS bezel (that would double-frame the phone).
function PhoneVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.7rem] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="block h-auto w-full"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay: delay * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- app section ---------- */

type App = {
  no: string;
  kicker: string;
  name: string;
  accent: string;
  bg: string;
  body: string;
  bullets: string[];
  video: { src: string; poster: string };
  screens: { src: string; alt: string }[];
};

const apps: App[] = [
  {
    no: "App 01",
    kicker: "Focus timer",
    name: "Dodo",
    accent: "#ef4661",
    bg: "#0d0a0b",
    body: "A focus timer stripped back to calm essentials — set a duration, tag your session, and let a single playful character keep you company while the time runs down.",
    bullets: [
      "Set a duration and tag each focus session",
      "A single playful character keeps you company",
      "Calm, near-black UI with one warm accent",
    ],
    video: { src: `${BASE}/dodo/prototype.mp4`, poster: `${BASE}/dodo/poster.jpg` },
    screens: [
      { src: `${BASE}/dodo/splash.webp`, alt: "Dodo welcome" },
      { src: `${BASE}/dodo/set-timer.webp`, alt: "Dodo set timer" },
      { src: `${BASE}/dodo/timer-on.webp`, alt: "Dodo timer running" },
      { src: `${BASE}/dodo/timer-complete.webp`, alt: "Dodo timer complete" },
    ],
  },
  {
    no: "App 02",
    kicker: "Weather",
    name: "Luma",
    accent: "#f0b400",
    bg: "#0e0c07",
    body: "Luma is Dodo's bright opposite — a weather app built on the idea that forecasts don't have to be boring, pairing big friendly numbers with expressive, colourful conditions.",
    bullets: [
      "Big, friendly current conditions at a glance",
      "Expandable hourly and daily forecast",
      "Saved locations and unit preferences",
    ],
    video: { src: `${BASE}/luma/prototype.mp4`, poster: `${BASE}/luma/poster.jpg` },
    screens: [
      { src: `${BASE}/luma/splash.webp`, alt: "Luma welcome" },
      { src: `${BASE}/luma/home.webp`, alt: "Luma home" },
      { src: `${BASE}/luma/location.webp`, alt: "Luma locations" },
      { src: `${BASE}/luma/settings.webp`, alt: "Luma settings" },
    ],
  },
];

function AppSection({ app }: { app: App }) {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: app.bg }}>
      <div className="shell">
        {/* header + feature video */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="md:max-w-lg">
            <Fade>
              <p
                className="font-rubik text-[0.72rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: app.accent }}
              >
                {app.no} — {app.kicker}
              </p>
              <h2 className="mt-4 font-rubik text-5xl font-bold tracking-tight md:text-7xl">
                {app.name}
              </h2>
              <p className="mt-6 leading-relaxed text-fg-dim">{app.body}</p>
              <ul className="mt-8 space-y-3">
                {app.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-fg-dim md:text-base"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: app.accent }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </Fade>
          </div>

          <Fade className="mx-auto w-[68%] max-w-[280px] md:ml-auto md:mr-0">
            <PhoneVideo src={app.video.src} poster={app.video.poster} />
          </Fade>
        </div>

        {/* screen set — uniform 4-up grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-24 md:gap-6">
          {app.screens.map((s, i) => (
            <Fade key={s.src} delay={i}>
              <PhoneScreen src={s.src} alt={s.alt} />
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- showcase ---------- */

export default function BundleShowcase({
  project,
  next,
}: {
  project: Project;
  next: { title: string; slug: string };
}) {
  return (
    <div className="bg-[#0a0a0a] font-rubik text-fg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36">
        <div className="shell">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <p className="font-rubik text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">
                UI Design · Two mobile apps
              </p>
              <h1 className="mt-5 font-rubik text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
                Bundle
                <br />
                of Apps
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-dim">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {(project.tags ?? []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-rubik text-xs text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* two-phone mockup cutout */}
            <div className="flex justify-center md:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/hero-mockup.webp`}
                alt="Dodo and Luma app mockups"
                className="w-full max-w-[480px] drop-shadow-[0_45px_90px_rgba(0,0,0,0.55)]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* META BAR */}
      <section className="border-y border-line">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-8">
          {[
            { label: "Role", value: project.role },
            { label: "Type", value: "Two mobile apps" },
            { label: "Discipline", value: project.category },
            { label: "Year", value: project.year },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-rubik text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </p>
              <p className="mt-2 font-rubik text-sm">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="shell py-24 md:py-32">
        <Fade>
          <h2 className="max-w-4xl font-rubik text-2xl font-medium leading-[1.35] tracking-tight md:text-[2.4rem] md:leading-[1.3]">
            A studio brief to design two distinct mobile products — each with its
            own personality, visual language and interaction model, taken from
            research all the way to high-fidelity prototypes.
          </h2>
        </Fade>
      </section>

      {/* APPS */}
      {apps.map((a) => (
        <AppSection key={a.name} app={a} />
      ))}

      {/* NEXT PROJECT */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line py-16 transition-colors hover:bg-bg-soft"
      >
        <div className="shell flex items-center justify-between gap-6">
          <div>
            <p className="font-rubik text-[0.7rem] uppercase tracking-[0.24em] text-muted">
              Next project
            </p>
            <p className="mt-3 font-rubik text-5xl font-bold tracking-tight transition-colors group-hover:text-fg-dim md:text-7xl">
              {next.title}
            </p>
          </div>
          <span className="font-rubik text-4xl text-muted transition-transform group-hover:translate-x-2 md:text-6xl">
            →
          </span>
        </div>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/types";

const BASE = "/projects/gridglow";
const ease = [0.22, 1, 0.36, 1] as const;
const PROTOTYPE_URL =
  "https://www.figma.com/proto/9h0xEUzwBuwYwDSkBhwueV/Ishara-Portfolio-Files?node-id=2001-12250&viewport=-88%2C480%2C0.09&t=HgepH3IFUZCWhjCb-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2001%3A12250&show-proto-sidebar=1&page-id=2001%3A2";

/* ---------- building blocks ---------- */

function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[859/1911] rounded-[2rem] bg-[#0a120d] p-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute left-1/2 top-[8px] h-[16px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

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
  const y = useTransform(scrollYProgress, [0, 1], [speed * 130, -speed * 130]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  color = "#3fce72",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="font-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em]"
      style={{ color }}
    >
      {children}
    </motion.p>
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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay: delay * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- data ---------- */

const problems = [
  {
    title: "Communication gap",
    body: "Alerts exist at grid level but never reach households in a localised, actionable format.",
  },
  {
    title: "Health & safety risk",
    body: "Medically-dependent households get no warning to protect medication, manage heat or plan care.",
  },
  {
    title: "Economic loss",
    body: "Micro-businesses lose ₱500–₱2,000 per unannounced outage in spoiled stock.",
  },
  {
    title: "No support",
    body: "No centralised information and no community infrastructure during an outage.",
  },
];

const features = [
  {
    kicker: "Watch zones",
    title: "Track the places that matter",
    body: "Follow your own barangay plus the areas where family and friends live, and see each zone's power status at a glance.",
    src: `${BASE}/screens/watch-zones.webp`,
  },
  {
    kicker: "Brownout map",
    title: "See the outage, not just hear about it",
    body: "A live colour-coded map shows which zones are scheduled to lose power and when — turning a grid notice into something you can act on.",
    src: `${BASE}/screens/brownout-map.webp`,
  },
  {
    kicker: "Scheduled alerts",
    title: "Clear, early, localised warnings",
    body: "Each alert spells out the exact area, date and window, with guidance on how to prepare — delivered early enough to matter.",
    src: `${BASE}/screens/alert-detail.webp`,
  },
  {
    kicker: "Preparation checklist",
    title: "Know what to do before the lights go out",
    body: "A personalised checklist — power, food, security, comfort, children — tailored to whether you're medically dependent, a micro-business or a general household.",
    src: `${BASE}/screens/checklist.webp`,
  },
];

const team = [
  { name: "Amy Zhang", role: "Project & Finance Manager" },
  { name: "Aaron Zou", role: "Art Director" },
  { name: "Charlotte Liu", role: "Digital Product Designer" },
  { name: "Ishika Desale", role: "UI/UX Designer", me: true },
  { name: "Yuxi Miao", role: "Strategy & Marketing Lead" },
];

/* ---------- showcase ---------- */

export default function GridGlowShowcase({
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
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, 38]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const confusedY = useTransform(scrollYProgress, [0, 1], [0, -46]);

  return (
    <div className="bg-[#0b1610] font-sans text-[#e7f1e9]">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-28 pb-20 md:pt-36"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% -10%, #134f30 0%, #0b1610 60%)",
          }}
        />
        <div className="shell relative z-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>NGCP × Global Victoria · Bohol, Philippines</Eyebrow>
              <h1 className="mt-5 font-poppins text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
                Grid
                <span className="text-[#3fce72]">Glow</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#a9c0b1]">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {(project.tags ?? []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 font-poppins text-xs text-[#a9c0b1]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[520px]">
              {/* confused mascot — peeks from behind the top-right */}
              <motion.img
                src={`${BASE}/assets/mascot-confused.webp`}
                alt=""
                aria-hidden
                style={{ y: confusedY }}
                className="pointer-events-none absolute right-0 top-0 z-0 w-[44%] max-w-[210px] drop-shadow-2xl md:-right-4"
              />
              {/* supplies mascot — peeks from behind the bottom-left */}
              <motion.img
                src={`${BASE}/assets/mascot.webp`}
                alt=""
                aria-hidden
                style={{ y: mascotY }}
                className="pointer-events-none absolute bottom-0 left-0 z-0 w-[46%] max-w-[220px] drop-shadow-2xl md:-left-4"
              />
              {/* phone sits on top, centred */}
              <motion.div
                style={{ y: phoneY }}
                className="relative z-10 w-[52%] max-w-[228px]"
              >
                <Phone
                  src={`${BASE}/screens/watch-zones.webp`}
                  alt="GridGlow home"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* META BAR */}
      <section className="border-y border-white/10">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-8">
          {[
            { label: "Role", value: project.role },
            { label: "Team", value: "Team Glow (5)" },
            { label: "Partners", value: "NGCP · Global Victoria" },
            { label: "Year", value: project.year },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-poppins text-[0.66rem] uppercase tracking-[0.18em] text-[#6f8a78]">
                {m.label}
              </p>
              <p className="mt-2 font-poppins text-sm">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-[#070d09] py-24 md:py-32">
        <div className="shell">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Fade>
              <div className="overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/assets/brownout-photo.webp`}
                  alt="A family during a brownout, lit by candlelight"
                  className="h-full w-full object-cover"
                />
              </div>
            </Fade>
            <div>
              <Eyebrow color="#ffd23f">The problem</Eyebrow>
              <h2 className="mt-5 font-poppins text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                A power outage without{" "}
                <span className="text-[#ffd23f]">effective warning</span>.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-[#a9c0b1]">
                Rotational brownouts are planned at grid level — but for
                households in Bohol they arrive without warning, again and
                again. The same cycle of uncertainty repeats before, during and
                after every outage.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <Fade key={p.title} delay={i}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="font-poppins text-base font-semibold text-[#3fce72]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a9c0b1]">
                    {p.body}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <div className="mb-10 text-center">
            <Eyebrow>Watch</Eyebrow>
            <h2 className="mt-4 font-poppins text-4xl font-bold tracking-tight md:text-5xl">
              GridGlow in motion
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#a9c0b1]">
              The full concept pitch — the problem, the system and the impact.
            </p>
          </div>
          <Fade>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]">
              <video
                controls
                playsInline
                preload="metadata"
                poster={`${BASE}/video-poster.jpg`}
                className="aspect-video w-full bg-black"
              >
                <source src={`${BASE}/gridglow.mp4`} type="video/mp4" />
              </video>
            </div>
          </Fade>
        </div>
      </section>

      {/* SOLUTION — three layers (deck page 14 style) */}
      <section className="relative overflow-hidden bg-[#070d09] pt-24 md:pt-32">
        <div className="shell">
          <div className="max-w-2xl">
            <Eyebrow>The response</Eyebrow>
            <h2 className="mt-5 font-poppins text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              One problem, three layers of support.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {/* Part 1 — App (light) */}
            <Fade delay={0}>
              <div className="flex h-full min-h-[460px] flex-col rounded-3xl bg-[#f4f8f2] p-8 text-[#0e1a12]">
                <div className="flex flex-1 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}/assets/app-phones.webp`}
                    alt="GridGlow app screens"
                    className="max-h-56 w-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <p className="mt-6 font-poppins text-xs font-bold uppercase tracking-[0.2em] text-[#1f9d57]">
                  Part 1
                </p>
                <h3 className="mt-2 font-poppins text-2xl font-bold">
                  GridGlow App
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#46594c]">
                  Proactive, localised brownout alerts delivered directly to
                  households via app, SMS, and Messenger.
                </p>
              </div>
            </Fade>

            {/* Part 2 — Campaign (green) */}
            <Fade delay={1}>
              <div className="flex h-full min-h-[460px] flex-col rounded-3xl bg-gradient-to-b from-[#28a95d] to-[#168a47] p-8 text-white">
                <div className="flex flex-1 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}/assets/mascot.webp`}
                    alt="GridGlow campaign mascot"
                    className="max-h-56 w-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <p className="mt-6 font-poppins text-xs font-bold uppercase tracking-[0.2em] text-[#fff2c2]">
                  Part 2
                </p>
                <h3 className="mt-2 font-poppins text-2xl font-bold">
                  Glow Impact Campaign
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Building awareness, educating households, and driving adoption
                  through the channels they already use.
                </p>
              </div>
            </Fade>

            {/* Part 3 — Hub (photo / dark) */}
            <Fade delay={2}>
              <div className="relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden rounded-3xl text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/assets/hub-photo.webp`}
                  alt="A community member helped at a resilience hub"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05281a] via-[#05281a]/75 to-transparent" />
                <div className="relative p-8">
                  <p className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-[#7be0a3]">
                    Part 3
                  </p>
                  <h3 className="mt-2 font-poppins text-2xl font-bold">
                    Community Resilience Hub
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    Physical support centres in barangay halls as the safety net
                    for when digital channels aren&apos;t enough.
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/* decorative landscape band — sits flush at the section's bottom edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/assets/scene.webp`}
          alt=""
          aria-hidden
          className="pointer-events-none mt-16 -mb-px block w-full select-none"
        />
      </section>

      {/* APP FEATURES */}
      <section className="py-24 md:py-32">
        <div className="shell mb-16 max-w-2xl">
          <Eyebrow>The app</Eyebrow>
          <h2 className="mt-5 font-poppins text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Localised alerts, made{" "}
            <span className="text-[#3fce72]">actionable</span>.
          </h2>
        </div>

        <div className="shell space-y-24 md:space-y-32">
          {features.map((f, i) => (
            <div
              key={f.kicker}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className={`md:sticky md:top-32 md:max-w-xl ${
                  i % 2 === 1 ? "md:ml-auto" : ""
                }`}
              >
                <Eyebrow color="#ffd23f">{f.kicker}</Eyebrow>
                <h3 className="mt-4 font-poppins text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                  {f.title}
                </h3>
                <p className="mt-5 leading-relaxed text-[#a9c0b1]">{f.body}</p>
              </div>
              <div className="flex justify-center">
                <Parallax speed={0.16} className="w-[62%] max-w-[260px]">
                  <Phone src={f.src} alt={f.title} />
                </Parallax>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USER FLOW */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="shell">
          <div className="max-w-2xl">
            <Eyebrow color="#ffd23f">End to end</Eyebrow>
            <h2 className="mt-5 font-poppins text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              The complete user flow.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#a9c0b1]">
              Every screen and decision point mapped out — from the first alert
              through preparation, the brownout itself, and recovery.
            </p>
          </div>
          <Fade>
            <a
              href={`${BASE}/assets/userflow.webp`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 flex justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#f4f8f2] p-4 md:p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/assets/userflow.webp`}
                alt="GridGlow full app user flow diagram"
                className="mx-auto block h-auto w-full max-w-5xl object-contain"
              />
            </a>
          </Fade>
          <p className="mt-4 font-poppins text-xs uppercase tracking-[0.18em] text-[#6f8a78]">
            Tap the flow to open it full size ↗
          </p>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[#070d09] py-24 md:py-32">
        <div className="shell">
          <Eyebrow>Reach &amp; impact</Eyebrow>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              { stat: "1.4M", label: "Bohol pilot population" },
              { stat: "117M", label: "Filipinos in brownout regions" },
              { stat: "94.9%", label: "of Filipino internet users on Facebook" },
            ].map((s, i) => (
              <Fade key={s.label} delay={i}>
                <p className="font-poppins text-6xl font-extrabold text-[#3fce72] md:text-7xl">
                  {s.stat}
                </p>
                <p className="mt-3 text-sm text-[#a9c0b1]">{s.label}</p>
              </Fade>
            ))}
          </div>

          {/* Team */}
          <div className="mt-20 border-t border-white/10 pt-12">
            <Eyebrow color="#ffd23f">Team Glow</Eyebrow>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-2xl border p-5 ${
                    t.me
                      ? "border-[#3fce72]/50 bg-[#3fce72]/10"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <p className="font-poppins text-sm font-semibold">{t.name}</p>
                  <p
                    className={`mt-1 text-xs ${
                      t.me ? "text-[#3fce72]" : "text-[#6f8a78]"
                    }`}
                  >
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROTOTYPE CTA */}
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(63,206,114,0.55), transparent 65%)",
          }}
        />
        <div className="shell relative z-10">
          <Eyebrow>Try it yourself</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl font-poppins text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Click through the GridGlow prototype.
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-[#a9c0b1]">
            The full app experience, interactive end to end in Figma.
          </p>
          <a
            href={PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#1f9d57] px-8 py-4 font-poppins text-sm font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#3fce72] hover:tracking-[0.18em]"
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
            <span className="font-poppins text-3xl text-[#6f8a78] transition-transform group-hover:-translate-x-2 group-hover:text-[#3fce72] md:text-5xl">
              ←
            </span>
            <span>
              <span className="block font-poppins text-[0.68rem] uppercase tracking-[0.24em] text-[#6f8a78]">
                Previous
              </span>
              <span className="mt-2 block font-poppins text-3xl font-extrabold tracking-tight transition-colors group-hover:text-[#3fce72] md:text-5xl">
                {prev.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-12 text-right sm:border-l sm:border-white/10 sm:py-16 sm:pl-8"
          >
            <span>
              <span className="block font-poppins text-[0.68rem] uppercase tracking-[0.24em] text-[#6f8a78]">
                Next
              </span>
              <span className="mt-2 block font-poppins text-3xl font-extrabold tracking-tight transition-colors group-hover:text-[#3fce72] md:text-5xl">
                {next.title}
              </span>
            </span>
            <span className="font-poppins text-3xl text-[#6f8a78] transition-transform group-hover:translate-x-2 group-hover:text-[#3fce72] md:text-5xl">
              →
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

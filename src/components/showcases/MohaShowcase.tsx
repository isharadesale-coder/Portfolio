"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/types";

const BASE = "/projects/moha";
const ease = [0.22, 1, 0.36, 1] as const;
const PROTOTYPE_URL =
  "https://www.figma.com/proto/WoSVV88f5ewXy5eChbSJUz/Assignment-Working-File---Ishara---MDC5210?node-id=1520-11034&t=SvjBLozSdQ0ZVs91-1";

const GOLD = "#c2a063";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className="font-poppins text-[0.7rem] font-medium uppercase tracking-[0.28em]"
      style={{ color: GOLD }}
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
      transition={{ duration: 0.8, ease, delay: delay * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[915/1976] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-black shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

const screens = [
  { src: `${BASE}/screens/about.webp`, alt: "About the exhibition" },
  { src: `${BASE}/screens/artist.webp`, alt: "Artist profile" },
  { src: `${BASE}/screens/artwork.webp`, alt: "Artwork detail" },
  { src: `${BASE}/screens/gallery.webp`, alt: "Gallery" },
  { src: `${BASE}/screens/tshirt.webp`, alt: "Merchandise preview" },
  { src: `${BASE}/screens/cart.webp`, alt: "Cart" },
  { src: `${BASE}/screens/shipping.webp`, alt: "Checkout — shipping details" },
  { src: `${BASE}/screens/payment.webp`, alt: "Checkout — payment" },
  { src: `${BASE}/screens/confirmation.webp`, alt: "Order confirmation" },
  { src: `${BASE}/screens/orders.webp`, alt: "Current orders" },
  { src: `${BASE}/screens/profile.webp`, alt: "Profile & settings" },
];

const palette = [
  { name: "Primary", hex: "#0b0a09", text: "#ece4d6" },
  { name: "Neutral", hex: "#ece4d6", text: "#0b0a09" },
  { name: "Neutral", hex: "#8a8073", text: "#0b0a09" },
  { name: "Accent", hex: "#c2a063", text: "#0b0a09" },
];

const features = [
  {
    kicker: "Meet the artist",
    title: "Stories behind every masterpiece",
    body: "Each work opens into the artist's world — life, dates, and the ideas that shaped the piece — set against the artwork itself in full, illuminated detail.",
    src: `${BASE}/assets/mockup-artist.webp`,
  },
  {
    kicker: "Take a piece home",
    title: "Personalise &amp; purchase",
    body: "Turn a favourite artwork into a tote, bottle, t-shirt or book. A focused, single-flow checkout makes gifting and collecting effortless — the exhibition, extended past the exit.",
    src: `${BASE}/assets/mockup-merch.webp`,
  },
];

const uxLaws = [
  {
    name: "Jakob's Law",
    body: "Familiar e-commerce patterns — home, search, cart, profile — so visitors navigate without a learning curve.",
  },
  {
    name: "Fitt's Law",
    body: "Primary actions are large, centred and within thumb reach to reduce interaction time on mobile.",
  },
  {
    name: "Hick's Law",
    body: "Each step offers limited, clear options — one artist per page, four merch types — easing decision fatigue.",
  },
  {
    name: "Miller's Law",
    body: "Information is chunked into short, scannable sections so essentials sit within the 7±2 memory rule.",
  },
  {
    name: "Law of Proximity",
    body: "Artwork, price and action are grouped to make hierarchy and relationships instantly readable.",
  },
  {
    name: "Von Restorff Effect",
    body: "Gold accents on key actions stand out cleanly in an otherwise monochrome, cathedral-dark interface.",
  },
];

export default function MohaShowcase({
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
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div className="bg-[#0b0a09] font-poppins text-[#ece4d6]">
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
              "radial-gradient(70% 50% at 50% -10%, #2a2114 0%, #0b0a09 60%)",
          }}
        />
        <div className="shell relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Renaissance Museum App · MDC5210</Eyebrow>
            <h1 className="mt-6 font-poppins text-7xl font-semibold tracking-[0.12em] md:text-9xl">
              MOHA
            </h1>
            <p
              className="mt-3 font-pinyon text-4xl md:text-5xl"
              style={{ color: GOLD }}
            >
              Heaven on Earth
            </p>
            <p className="mt-7 max-w-md leading-relaxed text-[#b6ab9a]">
              {project.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {(project.tags ?? []).slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#b6ab9a]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <motion.div style={{ y: phoneY }} className="mx-auto w-full max-w-[540px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/assets/hero-mockup.webp`}
              alt="MOHA app — artwork detail and gallery screens"
              className="w-full drop-shadow-[0_55px_90px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </div>
      </section>

      {/* META */}
      <section className="border-y border-white/10">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-8">
          {[
            { label: "Role", value: project.role },
            { label: "Type", value: "Museum companion app" },
            { label: "Discipline", value: "UI / UX Design" },
            { label: "Year", value: project.year },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[#7a7163]">
                {m.label}
              </p>
              <p className="mt-2 text-sm">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONCEPT */}
      <section className="shell py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="font-pinyon text-5xl" style={{ color: GOLD }}>
            The idea
          </span>
          <div className="mt-6 space-y-6">
            {(project.body ?? []).map((p, i) => (
              <Fade key={i} delay={i}>
                <p className="text-lg leading-relaxed text-[#b6ab9a] md:text-xl">
                  {p}
                </p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-[#080706] py-24 md:py-32">
        <div className="shell text-center">
          <Eyebrow>Walkthrough</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            MOHA in motion
          </h2>
          <Fade>
            <div className="mx-auto mt-12 w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
              <video
                controls
                playsInline
                preload="metadata"
                poster={`${BASE}/video-poster.jpg`}
                className="aspect-[9/19.5] w-full bg-black"
              >
                <source src={`${BASE}/moha.mp4`} type="video/mp4" />
              </video>
            </div>
          </Fade>
        </div>
      </section>

      {/* DESIGN SYSTEM */}
      <section className="shell py-24 md:py-32">
        <Eyebrow>Design system</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          Cathedral-dark, gold-lit, deliberately quiet.
        </h2>

        <div className="mt-14 grid items-stretch gap-12 md:grid-cols-[1.2fr_1fr]">
          {/* palette */}
          <Fade>
            <p className="mb-5 text-[0.66rem] uppercase tracking-[0.2em] text-[#7a7163]">
              Colour palette
            </p>
            <div className="grid grid-cols-2 gap-3 sm:h-[360px] sm:grid-cols-4">
              {palette.map((c, i) => (
                <div
                  key={i}
                  className="flex aspect-[3/4] flex-col justify-end rounded-xl border border-white/10 p-3 sm:aspect-auto sm:h-full"
                  style={{ backgroundColor: c.hex, color: c.text }}
                >
                  <span className="text-xs font-medium">{c.name}</span>
                  <span className="text-[0.62rem] opacity-70">{c.hex}</span>
                </div>
              ))}
            </div>
          </Fade>

          {/* type */}
          <Fade delay={1}>
            <p className="mb-5 text-[0.66rem] uppercase tracking-[0.2em] text-[#7a7163]">
              Typography
            </p>
            <div className="flex flex-col justify-center rounded-xl border border-white/10 p-6 sm:h-[360px]">
              <span className="font-pinyon text-7xl" style={{ color: GOLD }}>
                Aa
              </span>
              <p className="mt-1 text-xs text-[#7a7163]">
                Pinyon Script — poetic accents
              </p>
              <p className="mt-6 font-poppins text-4xl font-semibold">Aa</p>
              <p className="mt-1 text-xs text-[#7a7163]">
                Poppins — structure &amp; body
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* SCREENS GALLERY */}
      <section className="overflow-hidden bg-[#080706] py-24 md:py-32">
        <div className="shell flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Inside the app</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              From the exhibition wall to your hand.
            </h2>
          </div>
          <div className="flex items-center gap-2.5 text-[#8a8073]">
            <span className="font-poppins text-[0.64rem] uppercase tracking-[0.22em]">
              Swipe to explore
            </span>
            <motion.span
              aria-hidden
              animate={{ x: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="text-xl leading-none"
              style={{ color: GOLD }}
            >
              →
            </motion.span>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="flex gap-4 overflow-x-auto pb-4 pl-[clamp(1.25rem,5vw,4rem)] pr-6 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {screens.map((s, i) => (
              <Parallax
                key={s.src}
                speed={0.05 + (i % 2) * 0.08}
                className="w-[46vw] shrink-0 sm:w-[210px]"
              >
                <Phone src={s.src} alt={s.alt} />
              </Parallax>
            ))}
          </div>
          {/* right-edge fade hints there's more to swipe */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#080706] to-transparent md:w-28"
          />
        </div>
      </section>

      {/* FEATURE MOCKUPS */}
      {features.map((f, i) => (
        <section
          key={f.kicker}
          className={`py-20 md:py-28 ${i % 2 === 1 ? "bg-[#080706]" : ""}`}
        >
          <div
            className={`shell grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className={`md:max-w-md ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
              <Eyebrow>{f.kicker}</Eyebrow>
              <h3
                className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
                dangerouslySetInnerHTML={{ __html: f.title }}
              />
              <p className="mt-5 leading-relaxed text-[#b6ab9a]">{f.body}</p>
            </div>
            <div className="flex justify-center">
              <Parallax speed={0.16} className="w-[66%] max-w-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.kicker}
                  className="w-full drop-shadow-[0_45px_90px_rgba(0,0,0,0.7)]"
                />
              </Parallax>
            </div>
          </div>
        </section>
      ))}

      {/* UX LAWS */}
      <section className="shell py-24 md:py-32">
        <Eyebrow>Grounded in principle</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          UX laws, applied.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uxLaws.map((l, i) => (
            <Fade key={l.name} delay={i % 3}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3
                  className="font-poppins text-base font-semibold"
                  style={{ color: GOLD }}
                >
                  {l.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b6ab9a]">
                  {l.body}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* PROTOTYPE CTA */}
      <section className="relative overflow-hidden bg-[#080706] py-24 text-center md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[45vw] w-[45vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${GOLD}, transparent 65%)` }}
        />
        <div className="shell relative z-10">
          <span className="font-pinyon text-5xl" style={{ color: GOLD }}>
            Step inside
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Walk through the MOHA prototype.
          </h2>
          <a
            href={PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 font-poppins text-sm font-semibold uppercase tracking-[0.14em] text-[#0b0a09] transition-all duration-300 hover:tracking-[0.18em]"
            style={{ backgroundColor: GOLD }}
          >
            Open the prototype
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* PREV / NEXT */}
      <nav className="border-t border-white/10">
        <div className="shell grid sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex items-center gap-4 py-12 sm:py-16"
          >
            <span className="font-poppins text-3xl text-[#7a7163] transition-transform group-hover:-translate-x-2 group-hover:text-[#c2a063] md:text-5xl">
              ←
            </span>
            <span>
              <span className="block text-[0.68rem] uppercase tracking-[0.24em] text-[#7a7163]">
                Previous
              </span>
              <span className="mt-2 block font-poppins text-3xl font-semibold tracking-tight transition-colors group-hover:text-[#c2a063] md:text-5xl">
                {prev.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-end gap-4 py-12 text-right sm:border-l sm:border-white/10 sm:py-16 sm:pl-8"
          >
            <span>
              <span className="block text-[0.68rem] uppercase tracking-[0.24em] text-[#7a7163]">
                Next
              </span>
              <span className="mt-2 block font-poppins text-3xl font-semibold tracking-tight transition-colors group-hover:text-[#c2a063] md:text-5xl">
                {next.title}
              </span>
            </span>
            <span className="font-poppins text-3xl text-[#7a7163] transition-transform group-hover:translate-x-2 group-hover:text-[#c2a063] md:text-5xl">
              →
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

"use client";

import Reveal from "./Reveal";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/designwithishara?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ishika-desale" },
  { label: "GitHub", href: "https://github.com/isharadesale-coder" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[40vw] w-[80vw] -translate-x-1/2 translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,244,242,0.18), transparent 60%)",
        }}
      />
      <div className="shell relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-8">Got a project in mind?</p>
        </Reveal>
        <a
          href="mailto:ishikadesale.work@gmail.com"
          className="group block font-geist text-[clamp(3rem,13vw,11rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block transition-opacity duration-500 group-hover:opacity-60">
            Let’s Talk
          </span>
        </a>

        <Reveal delay={1}>
          <a
            href="mailto:ishikadesale.work@gmail.com"
            className="link-underline mt-12 inline-block font-geist text-base tracking-wide text-fg-dim hover:text-fg md:text-lg"
          >
            ishikadesale.work@gmail.com
          </a>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-geist text-xs uppercase tracking-[0.2em] text-muted hover:text-fg"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

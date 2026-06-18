"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <Logo />

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline font-geist text-xs font-medium uppercase tracking-[0.18em] text-fg-dim hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden className="font-geist text-xs tracking-[0.18em] text-muted">
            ®2026
          </span>
        </nav>
      </div>
    </motion.header>
  );
}

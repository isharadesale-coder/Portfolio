"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import WorkCursor from "./WorkCursor";

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-view
      className="group block h-full cursor-none"
    >
      <div className="relative h-[42vh] overflow-hidden border border-line bg-bg-card md:h-[58vh]">
        {project.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            draggable={false}
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
            style={{
              background: `radial-gradient(120% 90% at 30% 10%, ${project.accent}cc, transparent 55%), linear-gradient(160deg, ${project.accent}40, #0d0d0d 75%)`,
            }}
          />
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-geist text-xl font-medium tracking-tight md:text-2xl">
          {project.title}
        </h3>
        <span className="shrink-0 font-geist text-xs uppercase tracking-[0.14em] text-muted">
          {project.category}
        </span>
      </div>
    </Link>
  );
}

/**
 * A pair of projects: asymmetric by default (one small, one big), with the
 * hovered one growing and its neighbour shrinking. Handled in CSS via :has()
 * (see .work-row in globals.css) so it's reliable on real hover.
 */
function WorkRow({ pair, flip }: { pair: Project[]; flip: boolean }) {
  if (pair.length === 1) {
    return (
      <div className="mx-auto w-full md:w-[72%]">
        <Card project={pair[0]} />
      </div>
    );
  }

  return (
    <div
      className="work-row flex flex-col gap-12 md:flex-row md:items-start md:gap-8"
      data-flip={flip ? "1" : "0"}
    >
      {pair.map((p) => (
        <div key={p._id} className="work-item min-w-0">
          <Card project={p} />
        </div>
      ))}
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Works({ projects }: { projects: Project[] }) {
  const rows = chunk(projects, 2);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <WorkCursor />

      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="eyebrow mb-5">Selected Work</p>
            <p className="text-sm leading-relaxed text-fg-dim">
              A selection of recent product, brand and interaction design
              work — from early concept and UX through to the final,
              motion-led interface.
            </p>
          </div>
          <h2 className="font-geist text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
            My Work
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {rows.map((pair, r) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease }}
            >
              <WorkRow pair={pair} flip={r % 2 === 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import FocusMateShowcase from "@/components/showcases/FocusMateShowcase";
import GridGlowShowcase from "@/components/showcases/GridGlowShowcase";
import MohaShowcase from "@/components/showcases/MohaShowcase";
import { getProject, getProjects, getProjectSlugs } from "@/lib/data";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Ishika Desale`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  // Bespoke Apple-style case study for FocusMate.
  if (slug === "focusmate") {
    return (
      <FocusMateShowcase
        project={project}
        next={{ title: next.title, slug: next.slug }}
      />
    );
  }

  // Bespoke case study for GridGlow.
  if (slug === "gridglow") {
    return (
      <GridGlowShowcase
        project={project}
        next={{ title: next.title, slug: next.slug }}
      />
    );
  }

  // Bespoke case study for MOHA.
  if (slug === "moha") {
    return (
      <MohaShowcase
        project={project}
        next={{ title: next.title, slug: next.slug }}
      />
    );
  }

  const meta = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
  ].filter((m) => m.value);

  return (
    <article className="pt-28 md:pt-36">
      {/* Header */}
      <header className="shell">
        <Link
          href="/#work"
          className="link-underline mb-12 inline-block font-grotesk text-xs uppercase tracking-[0.2em] text-muted hover:text-fg"
        >
          ← Back to work
        </Link>

        <p className="eyebrow mb-6">{project.category}</p>
        <h1 className="display-lg max-w-5xl">{project.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-dim">
          {project.summary}
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-grotesk text-[0.66rem] uppercase tracking-[0.2em] text-muted">
                {m.label}
              </dt>
              <dd className="mt-2 font-grotesk text-sm">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Hero visual */}
      <div className="shell mt-16">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-line"
          style={{
            background: project.coverUrl
              ? undefined
              : `radial-gradient(120% 90% at 30% 10%, ${project.accent}cc, transparent 55%), linear-gradient(160deg, ${project.accent}40, #0d0b09 75%)`,
          }}
        >
          {project.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="shell mt-20 grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          {project.tags && project.tags.length > 0 && (
            <Reveal>
              <h2 className="font-grotesk text-xs uppercase tracking-[0.2em] text-muted">
                Disciplines
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-grotesk text-xs text-fg-dim"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-col gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-grotesk text-sm text-accent-soft"
                >
                  Visit live site ↗
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-grotesk text-sm text-fg-dim"
                >
                  View repository ↗
                </a>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {(project.body ?? [project.summary]).map((para, i) => (
            <Reveal key={i} delay={i}>
              <p className="text-lg leading-relaxed text-fg-dim md:text-xl md:leading-relaxed">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="shell mt-20 grid gap-6 md:grid-cols-2">
          {project.gallery.map((g, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-[1.25rem] border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.url}
                alt={g.alt ?? `${project.title} ${i + 1}`}
                className="h-full w-full object-cover"
              />
              {g.caption && (
                <figcaption className="px-4 py-3 font-grotesk text-xs text-muted">
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group mt-28 block border-t border-line py-16 transition-colors hover:bg-bg-soft"
      >
        <div className="shell flex items-center justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Next project</p>
            <p className="display-lg transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </div>
          <span className="font-display text-4xl text-muted transition-transform group-hover:translate-x-2 group-hover:text-accent md:text-6xl">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}

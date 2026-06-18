import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
} from "@/sanity/queries";
import { mockProjects } from "./mock";
import type { Project } from "./types";

// Revalidate fetched content every 60s in production.
const fetchOpts = { next: { revalidate: 60 } } as const;

function withDefaults(p: Partial<Project>): Project {
  return {
    _id: p._id ?? crypto.randomUUID(),
    title: p.title ?? "Untitled",
    slug: p.slug ?? "untitled",
    category: p.category ?? "Project",
    year: p.year ?? "",
    accent: p.accent ?? "#c9924f",
    summary: p.summary ?? "",
    ...p,
  } as Project;
}

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return mockProjects;
  try {
    const docs = await client.fetch<Partial<Project>[]>(
      projectsQuery,
      {},
      fetchOpts,
    );
    if (!docs || docs.length === 0) return mockProjects;
    return docs.map(withDefaults);
  } catch (err) {
    console.warn("[data] Sanity fetch failed, using mock data:", err);
    return mockProjects;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) {
    return mockProjects.find((p) => p.slug === slug) ?? null;
  }
  try {
    const doc = await client.fetch<Partial<Project> | null>(
      projectBySlugQuery,
      { slug },
      fetchOpts,
    );
    return doc ? withDefaults(doc) : null;
  } catch (err) {
    console.warn("[data] Sanity fetch failed, using mock data:", err);
    return mockProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return mockProjects.map((p) => p.slug);
  try {
    const slugs = await client.fetch<string[]>(projectSlugsQuery, {}, fetchOpts);
    return slugs ?? [];
  } catch {
    return mockProjects.map((p) => p.slug);
  }
}

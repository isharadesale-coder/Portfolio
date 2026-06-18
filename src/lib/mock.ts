import type { Project } from "./types";

/**
 * Placeholder projects shown until you connect Sanity.
 * No external images — each card renders an on-brand gradient,
 * so the design looks intentional out of the box.
 *
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set and you add projects in
 * /studio, this mock data is automatically replaced by your real content.
 */
export const mockProjects: Project[] = [
  {
    _id: "focusmate",
    title: "FocusMate",
    slug: "focusmate",
    category: "Interaction Design",
    year: "2025",
    role: "Product Designer (Solo)",
    accent: "#3c4a2f",
    summary:
      "A study-accountability app that pairs you with a focus partner and turns every completed session into a city you build together.",
    body: [
      "FocusMate is a self-initiated product concept built around a simple truth: studying alone is easy to abandon, and most productivity tools don't actually keep you accountable.",
      "The concept pairs students with a study partner by field and level, runs focused co-working sessions with camera-on presence, then converts that effort into visible progress — an isometric city that grows building by building with every session, and falls into ruin if you stop showing up.",
      "I designed the full experience end to end: 30-second onboarding and study profiles, the partner-matching flow with a random-pairing fallback, the live dual-timer focus session with a mid-session discussion request, mutual focus ratings, and the city-building reward loop — all wrapped in a warm, editorial cream-and-green identity with hand-rendered isometric illustration.",
    ],
    tags: [
      "UX Design",
      "UI Design",
      "Interaction Design",
      "Prototyping",
      "Mobile App",
      "Gamification",
      "Figma",
    ],
    coverUrl: "/projects/focusmate/cover.webp",
    gallery: [
      {
        url: "/projects/focusmate/onboarding.png",
        alt: "Onboarding and study profile screens",
        caption: "Onboarding & study profile — set field, level and partner preferences in 30 seconds",
      },
      {
        url: "/projects/focusmate/match-flow.png",
        alt: "Partner matching flow screens",
        caption: "Partner match flow — match by field and level, or invite a friend directly",
      },
      {
        url: "/projects/focusmate/focus-session.png",
        alt: "Live focus session with dual timer",
        caption: "The focus session — a live dual timer with camera-on presence and mid-session discussion",
      },
      {
        url: "/projects/focusmate/rate-grow.png",
        alt: "Break, rate and grow screens",
        caption: "Break, rate & grow — mutual focus ratings drive how much of the city gets built",
      },
      {
        url: "/projects/focusmate/build-cities.png",
        alt: "Building cities from focus sessions",
        caption: "Build cities — pick a real city and watch it rise, building by building, with every session",
      },
    ],
    featured: true,
  },
  {
    _id: "gridglow",
    title: "GridGlow",
    slug: "gridglow",
    category: "Product & Service Design",
    year: "2025",
    role: "UI/UX Designer",
    accent: "#1f9d57",
    summary:
      "A design response to rotational brownouts in Bohol — informing, preparing and supporting households before, during and after every power outage.",
    body: [
      "GridGlow was a team project for Monash's Design Management & Entrepreneurship studio, commissioned under Global Victoria in partnership with NGCP, the Philippines' national grid operator.",
      "Across Bohol, households face the same cycle of uncertainty around rotational brownouts — outages that are planned at grid level but arrive without warning for families, leaving medically-dependent people and micro-businesses exposed.",
      "Our response is a three-part system: a localised alert app, a Facebook-led awareness campaign that meets people where they already are, and physical Community Resilience Hubs in barangay halls. As UI/UX Designer I led the app's experience — onboarding, watch zones, the brownout map, alerts and the preparation checklist.",
    ],
    tags: [
      "UX Design",
      "UI Design",
      "Service Design",
      "Design Strategy",
      "Mobile App",
      "Figma",
    ],
    coverUrl: "/projects/gridglow/cover.webp",
    featured: true,
  },
  {
    _id: "moha",
    title: "MOHA",
    slug: "moha",
    category: "UI / UX Design",
    year: "2024",
    role: "UI/UX Designer (Solo)",
    accent: "#c2a063",
    summary:
      "A digital companion to a Renaissance museum exhibition — explore the artworks, learn their stories, and take a piece home.",
    body: [
      "MOHA is the digital extension of a museum's special exhibition, 'Heaven on Earth: The Treasures of the Renaissance'. It brings the works off the wall and into the visitor's hand — to explore, understand, and connect with the art before, during and after the visit.",
      "The interface is dark and cathedral-inspired, foregrounding the illuminated artworks while refined typography and gold accents carry the Renaissance aesthetic. Every screen balances visual storytelling with quiet, functional clarity.",
      "As the sole designer I built the full experience — the design system, the artwork and artist journeys, and a personalise-and-purchase flow — grounding each decision in UX laws and a comparative study of Google Arts & Culture, the Met app and Saatchi Art.",
    ],
    tags: [
      "UI Design",
      "UX Design",
      "Design System",
      "Interaction Design",
      "Mobile App",
      "Figma",
    ],
    coverUrl: "/projects/moha/cover.webp",
    featured: true,
  },
  {
    _id: "mock-4",
    title: "Field Notes",
    slug: "field-notes",
    category: "Editorial",
    year: "2024",
    role: "Designer",
    client: "Field Notes Mag",
    accent: "#8a6b9e",
    summary:
      "A monochrome editorial system and team showcase grid with refined small-caps detailing.",
    body: [
      "Inspired by print layout discipline — tight grids, hairline rules, and a focused-item spotlight pattern.",
    ],
    tags: ["Editorial", "Design System", "Layout"],
    featured: false,
  },
  {
    _id: "mock-5",
    title: "Halcyon",
    slug: "halcyon",
    category: "Brand & Web",
    year: "2023",
    role: "Design & Build",
    client: "Halcyon",
    accent: "#4f7c9a",
    summary:
      "A calm, confident portfolio framework for a photography collective.",
    body: [
      "Full-bleed imagery, slow transitions, and a navigation that gets out of the way.",
    ],
    tags: ["Photography", "Next.js", "CMS"],
    featured: false,
  },
];

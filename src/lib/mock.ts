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
      "A study-accountability app that pairs you with a focus partner for live sessions, then turns the focus score you earn into your own city that grows, session by session.",
    body: [
      "FocusMate is a self-initiated product concept built around a simple truth: studying alone is easy to abandon, and most productivity tools don't actually keep you accountable.",
      "The concept pairs students with a study partner by field and level and runs focused, camera-on co-working sessions. Your progress, though, is entirely your own — each session you build a personal isometric city, where every building's growth is driven by the combined average focus score you and your partner give each other afterwards.",
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
    _id: "bundle",
    title: "Bundle of Apps",
    slug: "bundle-of-apps",
    category: "UI Design",
    year: "2024",
    role: "UI/UX Designer",
    accent: "#dd2740",
    summary:
      "Two mobile app concepts designed end to end — Dodo, a calm focus timer, and Luma, a weather app that makes the forecast feel anything but boring.",
    body: [
      "Bundle of Apps was a UI design studio brief to design two distinct mobile products, each with its own personality, visual language and interaction model — taken from research and a type scale all the way to high-fidelity prototypes.",
      "Dodo is a focus timer stripped back to calm essentials: set a duration, tag your session, and watch a single playful character keep you company while time runs down. Luma is its bright opposite — a weather app built on the idea that 'forecasts don't have to be boring', pairing big friendly numbers with expressive, colourful conditions.",
    ],
    tags: ["UI Design", "Visual Design", "Prototyping", "Mobile App", "Figma"],
    coverUrl: "/projects/bundle/cover.webp",
    featured: true,
  },
  {
    _id: "metrogo",
    title: "MetroGo",
    slug: "metrogo",
    category: "Coming soon",
    year: "2026",
    accent: "#2f6fb0",
    summary:
      "A live companion for navigating Sydney train trackwork — in progress.",
    comingSoon: true,
    featured: false,
  },
];

# Portfolio — quick guide

Sleek, motion-led portfolio built with **Next.js 16 (App Router) + Framer Motion + GSAP + Lenis**, with **Sanity** as the CMS.

## Run it

```bash
cd portfolio
npm run dev        # http://localhost:3000
```

Until Sanity is connected, the site shows 5 on-brand placeholder projects so the
design is fully visible.

## Structure

- `src/app/(site)/` — the public site (home + `/work/[slug]` detail pages). Route
  group so the Studio stays free of the nav/footer/smooth-scroll.
- `src/app/studio/` — the embedded Sanity Studio at `/studio`.
- `src/components/` — `Hero`, `Works` (the 3D carousel), `About`, `Contact`,
  `Marquee`, `Nav`, `Footer`, `SmoothScroll`, `Reveal`.
- `src/lib/` — `data.ts` (fetch with mock fallback), `mock.ts`, `types.ts`.
- `src/sanity/` — client, schema (`schemaTypes/project.ts`), queries, env.

## Connect your real projects (Sanity)

1. Create a free project at https://www.sanity.io/manage → note the **Project ID**.
2. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="xxxxxxxx"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```
3. In `sanity.config.ts`, add `http://localhost:3000` (and later your live domain)
   to the project's **CORS origins** in the Sanity dashboard, with credentials.
4. Restart `npm run dev`, open `http://localhost:3000/studio`, log in, and add a
   **Project**. The home page switches from mock data to your content automatically.

### Project fields
title, slug, category, year, role, client, summary, description paragraphs,
accent colour (hex — drives the card gradient), cover image, gallery, tags,
live URL, repo URL, featured.

> No cover image? The card renders an on-brand gradient from the accent colour, so
> unfinished projects still look intentional.

## Deploy
Push to GitHub and import into **Vercel**. Add the same `NEXT_PUBLIC_SANITY_*`
env vars in the Vercel project settings.

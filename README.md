# Sunny Chadha — REALTOR® Website

A custom Next.js website for Sunny Chadha, REALTOR® with Century 21 Coastal
Realty Ltd., serving commercial and residential clients across the Lower
Mainland and Fraser Valley, BC. Built to replace his
corporate-template Century 21 profile page with a fast, fully-owned, custom
site.

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion (animations, page transitions)
- Deploy target: Netlify (`netlify.toml` + `@netlify/plugin-nextjs`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values as they become
available:

| Variable | Purpose | Status |
| --- | --- | --- |
| `FOLLOW_UP_BOSS_API_KEY` | Forwards lead form submissions to Sunny's Follow Up Boss CRM from `app/api/lead/route.ts`. | **Placeholder — not yet wired up.** The route currently logs submissions server-side only. See the TODO comments in that file for the exact Follow Up Boss Events API call to add once the key is available. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Enables the embedded map on listing detail pages (`components/MapEmbed.tsx`). | Optional — without it, the map section renders a graceful placeholder instead of an iframe. |

Never commit real values for these — `.env*` is gitignored except for
`.env.example`.

## MLS / IDX Data — Important TODO

The `/listings` pages are currently built against **mock data** in
`data/listings.json` (6 sample North Shore properties, not yet updated for the
Lower Mainland / Fraser Valley repositioning). There is no live MLS
feed connected.

To go live with real listings, CJ/Anmol need to source one of:

- A **RESO/RETS feed** through the local real estate board (Real Estate
  Board of Greater Vancouver), or
- A licensed **IDX provider** such as iHomefinder or Chime.

**Do not scrape realtor.ca or MLS listing data directly** — this violates
board terms of use. Once a licensed feed is available, replace the data
source in `lib/listings.ts` (currently reading `data/listings.json`) with
calls to the real feed, keeping the same `Listing` shape defined in
`lib/types.ts` where possible.

## Lead Routing

Contact and "Request a Showing" forms (`components/LeadForm.tsx`) POST to
`app/api/lead/route.ts`, a placeholder API route. It currently validates the
submission and logs it server-side. Once Sunny's Follow Up Boss API key is
available, wire up the forwarding call documented in the TODO comments in
that file — do not fabricate a working integration before real credentials
exist.

## Compliance Notes

- The required SMS/marketing consent checkbox language on all lead forms
  must not be altered — see `components/LeadForm.tsx`.
- `app/privacy-policy/page.tsx` contains **placeholder** privacy policy
  copy. Replace with the final drafted policy and have it reviewed for
  PIPEDA/CASL and brokerage compliance before launch.
- `components/Footer.tsx` has a TODO reminding CJ to confirm the required
  Century 21 Coastal Realty Ltd. brokerage disclosure/logo placement — many
  real estate boards require brokerage branding even on an independent
  agent site.
- Listing "photos" and the homepage hero currently use generated
  placeholder graphics (`components/PropertyPhoto.tsx`), not real property
  or headshot photography — see the TODO comments there and in
  `components/AgentIntroCard.tsx` / `app/about/page.tsx` for where to swap
  in real assets.

## Project Structure

```
app/                  routes (App Router)
  listings/           /listings and /listings/[slug]
  advice/             /advice + buying, selling, financing, market-reports
  news/               /news and /news/[slug]
  about/, testimonials/, contact/, privacy-policy/
  api/lead/            placeholder lead-intake route handler
components/           shared UI components
data/                 mock content (listings.json, testimonials.ts, news.ts)
lib/                  data access helpers + shared types
```

## Deploying to Netlify

This repo includes a `netlify.toml` configured with `@netlify/plugin-nextjs`.
Connect the repo in Netlify, set the environment variables above in the site
settings, and deploys will run `npm run build` automatically.

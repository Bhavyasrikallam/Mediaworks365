# Mediaworks 365 — Marketing Website

The marketing website for **Mediaworks 365**, a full-service agency covering SEO, store branding, on-ground activations, event integration, digital branding and out-of-home campaigns. It presents the services, captures leads through a single contact form with distinct inquiry journeys (consultation, marketing audit, quote, general), and is built to be fast, accessible (WCAG 2.2 AA) and statically prerendered.

> **Not launch-ready yet.** Several claims, assets and legal pages still need business sign-off. See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- [zod](https://zod.dev) for lead validation, [lucide-react](https://lucide.dev) for icons
- [Resend](https://resend.com) HTTP API for lead email delivery (no SDK dependency)

> Next.js 16 has breaking changes from earlier versions. Check the bundled docs in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Getting started

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # then fill in values as needed
npm run dev                  # http://localhost:3000
```

No environment variables are required for local development: contact details are simply hidden and leads are logged (redacted) to the server console.

## Scripts

| Script              | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Start the development server                                    |
| `npm run build`     | Production build                                                |
| `npm run start`     | Serve the production build                                      |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)             |
| `npm run typecheck` | Generate route types (`next typegen`) and run `tsc --noEmit`    |
| `npm run check`     | Lint + typecheck + build — run before every merge/release       |

## Environment variables

Copy `.env.example` to `.env.local` locally; set the same keys in your host's dashboard per environment.

| Variable                      | Scope  | Required                | Purpose                                                                                       |
| ----------------------------- | ------ | ----------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Public | Yes (preview + prod)    | Absolute site URL for canonical links, sitemap, robots and Open Graph. No trailing slash.       |
| `NEXT_PUBLIC_ALLOW_INDEXING`  | Public | Production only         | `true` allows search indexing and publishes the sitemap. Anything else = `noindex` + `Disallow: /`. |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | Public | When approved           | Official contact email. Not rendered while blank.                                             |
| `NEXT_PUBLIC_CONTACT_PHONE`   | Public | When approved           | Official phone number. Not rendered while blank.                                              |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Public | When approved           | Business address. Not rendered while blank.                                                   |
| `NEXT_PUBLIC_BUSINESS_HOURS`  | Public | When approved           | Business hours. Not rendered while blank.                                                     |
| `RESEND_API_KEY`              | Server | Production              | Resend API key used to email leads.                                                           |
| `CONTACT_TO_EMAIL`            | Server | Production              | Inbox that receives leads.                                                                    |
| `CONTACT_FROM_EMAIL`          | Server | Recommended             | Sender address on a domain verified in Resend.                                                |

`NEXT_PUBLIC_*` values are inlined at build time — rebuild after changing them. Never put secrets in `NEXT_PUBLIC_*` variables.

## Project structure

```
src/
  app/                    Routes (App Router)
    page.tsx              Home
    about/ industries/ services/ services/[slug]/ portfolio/ contact/
    privacy/ accessibility/
    api/contact/route.ts  Lead intake endpoint (validation, rate limit, spam trap, delivery)
    sitemap.ts robots.ts opengraph-image.tsx
    not-found.tsx error.tsx global-error.tsx
    layout.tsx globals.css
  content/site.ts         SINGLE SOURCE OF TRUTH for all copy, services, claims and CTAs
  components/
    ui/                   Primitives (Container, Section, ButtonLink, Icon, CountUp, Reveal)
    layout/               Header, Footer, Logo
    sections/             Shared page sections (PageHero, CtaBand)
    home/ about/ services/ industries/ portfolio/ contact/   Page-specific sections
    legal/                Prose layout + draft notice for policy pages
  lib/                    leads.ts (zod schema), rate-limit.ts, cn.ts
public/brand/             Logo files
```

**Editing content:** change copy in `src/content/site.ts` only — pages read from it, so a headless CMS can replace this module later without touching components. Every figure in `claims` is an unverified placeholder until signed off (see the checklist).

## Lead handling

The contact form posts JSON to `/api/contact`, which validates the payload with zod, applies a per-IP rate limit (5 per 10 minutes, per server instance) and a honeypot spam trap, then:

| Environment                     | `RESEND_API_KEY` + `CONTACT_TO_EMAIL` set | Behaviour                                                          |
| ------------------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| Any                             | Yes                                       | Emails the lead via Resend. Returns 502 if delivery fails.          |
| Development                     | No                                        | Logs a redacted summary (no personal data) to the console; returns success. |
| Production (`NODE_ENV=production`) | No                                     | Returns **503** and logs a configuration error — leads are never silently dropped. |

## Security & SEO defaults

- Security headers for all routes are set in `next.config.ts`: a static Content-Security-Policy (no nonces, so pages stay static), HSTS (production), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` and a restrictive `Permissions-Policy`. If you add a third-party script, font, image host or API, update the CSP.
- `robots.txt`, `sitemap.xml` and the page-level robots meta all follow `NEXT_PUBLIC_ALLOW_INDEXING`.
- A default 1200×630 Open Graph image is generated from `src/app/opengraph-image.tsx`.

## Deployment

Deploy to a managed Node.js host such as [Vercel](https://vercel.com) (zero-config for Next.js). Any host that runs `next build` / `next start` works.

- **Preview / staging:** set `NEXT_PUBLIC_SITE_URL` to the preview URL. Leave `NEXT_PUBLIC_ALLOW_INDEXING` unset or `false` so previews are never indexed. Lead delivery may point at a test inbox.
- **Production:** set `NEXT_PUBLIC_SITE_URL` to the canonical domain, `NEXT_PUBLIC_ALLOW_INDEXING=true` (production **only**), the Resend variables, and approved contact details.
- The in-memory rate limiter is per instance; on multi-instance or serverless hosts add a platform firewall/rate-limit rule or a shared store.

## Before launch

Work through [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md): claim substantiation, rights-cleared assets, legal approval of the privacy policy, production controls and release gates.

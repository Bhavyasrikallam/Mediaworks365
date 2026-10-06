# Launch Checklist

Derived from the Production Readiness Plan. Nothing on this list is optional: the site does not go to production until every **Release gate** (section D) is met. Owners are TBC until the Priority-A decision-maker is named (section E).

Status values: **Open** → **Evidence received** → **Approved** / **Removed**.

---

## A. Claims & asset register

Every figure below lives in `src/content/site.ts` (`claims` and `home.highlightBadges`) and is an **unverified placeholder** from the draft copy. Each one must be substantiated with evidence and approved by a named owner, or removed/reworded, before launch.

### Claims

| # | Claim | Where used | Owner | Evidence | Status |
| - | ----- | ---------- | ----- | -------- | ------ |
| 1 | 500+ Successful Campaigns | Home hero stats (`claims.highlights`) | TBC | — | Open |
| 2 | 200+ Happy Clients | Home hero stats (`claims.highlights`) | TBC | — | Open |
| 3 | 10+ Years of Industry Experience | Home hero stats (`claims.highlights`) | TBC | — | Open |
| 4 | Certified Marketing Professionals | Home hero badge (`home.highlightBadges`) — name the certification(s) | TBC | — | Open |
| 5 | 350% increase in website traffic | Home Success Stories (`claims.successStories`) | TBC | — | Open |
| 6 | 5X return on advertising investment (ROAS) | Home Success Stories (`claims.successStories`) | TBC | — | Open |
| 7 | Thousands of qualified leads generated | Home Success Stories (`claims.successStories`) | TBC | — | Open |
| 8 | Higher conversion rates across multiple industries | Home Success Stories (`claims.successStories`) | TBC | — | Open |
| 9 | 250+ retail activations — store outlets across the US | Portfolio Impact Summary (`claims.portfolioImpact`) | TBC | — | Open |
| 10 | 120,000+ live product samples / direct consumer interactions | Portfolio Impact Summary (`claims.portfolioImpact`) | TBC | — | Open |
| 11 | 15M+ OOH campaign impressions | Portfolio Impact Summary (`claims.portfolioImpact`) | TBC | — | Open |
| 12 | 4.2x average client ROI | Portfolio Impact Summary (`claims.portfolioImpact`) | TBC | — | Open |

Evidence examples: campaign/CRM exports, client contracts count, incorporation date, certification records, analytics or platform reports (with date range and methodology for % / ROI figures), client permission where results are attributable.

### Assets

| # | Asset | Current state on site | Owner | Needed for approval | Status |
| - | ----- | --------------------- | ----- | ------------------- | ------ |
| 13 | Client logos ("Trusted By") | None shown — neutral audience strip (`clientLogos` is empty) | TBC | Written permission per logo + vector files | Open |
| 14 | Team names & photos ("Meet Our Experts") | Role cards only, no people | TBC | Names, titles, bios, photos, photo/name consent | Open |
| 15 | Portfolio items | 9 capability showcases — no client names, results or photos | TBC | Rights-cleared case studies: client permission, photography, dates, results | Open |
| 16 | Hero headline | "Accelerate Your Business. Anytime, Anywhere, 365 Days a Year." in use; alternates ("Transforming Brands, Accelerating Impact", "Fast-track your growth with high-performance, budget-optimized campaigns") awaiting selection | TBC | Stakeholder selection | Open |
| 17 | Contact form budget ranges | Placeholder ranges in `src/lib/leads.ts` | TBC | Approved ranges | Open |

---

## B. Content still needed

- [ ] **Official contact details** — email, phone, address, business hours. Set via `NEXT_PUBLIC_CONTACT_*` / `NEXT_PUBLIC_BUSINESS_HOURS` env vars (blank values are hidden).
- [ ] **Social profiles** — URLs for `site.social` (currently empty).
- [ ] **Team profiles** — see asset #14.
- [ ] **Case studies** — at least 2–3 rights-cleared stories to replace or supplement capability showcases (asset #15).
- [ ] **Client logos** — see asset #13.
- [ ] **Legal approval of the Privacy Policy** (`/privacy`, currently marked "Draft — pending legal review"): confirm retention period, processors, jurisdiction-specific rights; then remove the draft notice.
- [ ] **Accessibility Statement** (`/accessibility`) reviewed and dated after the accessibility audit.
- [ ] Decide whether Terms of Use / cookie notice are required for target regions.
- [ ] Final proofread of all copy in `src/content/site.ts`.

---

## C. Production readiness controls

### Performance
- [ ] Lighthouse (mobile) ≥ 90 Performance on Home, a service page, Portfolio, Contact.
- [ ] Core Web Vitals within "good": LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] All routes statically prerendered (check `next build` output); images served as AVIF/WebP via `next/image`.
- [ ] No unused third-party scripts; fonts self-hosted via `next/font`.

### Accessibility (WCAG 2.2 AA)
- [ ] Automated scan (axe / Lighthouse) shows zero violations on every page.
- [ ] Keyboard-only walkthrough: skip link, menus, form, focus order, visible focus.
- [ ] Screen-reader pass (NVDA + Chrome, VoiceOver + Safari) including form errors and success state.
- [ ] 200% / 400% zoom and 320px width with no loss of content or horizontal scroll.
- [ ] `prefers-reduced-motion` respected; colour contrast verified.

### SEO
- [ ] Unique title, description and canonical on every page; one `h1` per page.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the canonical domain; `sitemap.xml` and `robots.txt` correct in production.
- [ ] Open Graph image renders (check with a social share debugger).
- [ ] Organization JSON-LD validates (Rich Results Test).
- [ ] Redirects planned from any existing/legacy site URLs.
- [ ] Google Search Console verified; sitemap submitted.

### Security
- [ ] Security headers present in production (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) — verify with securityheaders.com.
- [ ] CSP updated for any third-party service added (analytics, maps, embeds).
- [ ] Secrets only in host env vars (never `NEXT_PUBLIC_*`, never committed).
- [ ] Contact endpoint: validation, payload limit, honeypot and rate limit tested; platform-level rate limiting/WAF configured for multi-instance hosting.
- [ ] `npm audit` reviewed; dependencies up to date.

### Privacy
- [ ] Privacy Policy legally approved and linked in the footer.
- [ ] Lead data minimised; server logs contain no personal data (verified).
- [ ] Data processing terms in place with email provider (Resend) and host.
- [ ] If analytics/cookies are added: consent mechanism + policy update **before** enabling.

### Reliability
- [ ] Resend domain verified (SPF/DKIM/DMARC); `CONTACT_FROM_EMAIL` on that domain.
- [ ] End-to-end test lead delivered in production for every inquiry type.
- [ ] Production returns 503 (not silent success) if lead delivery is misconfigured — confirmed.
- [ ] Uptime monitoring on `/` and alerting on `/api/contact` errors.
- [ ] Custom 404 and error pages verified.

### Quality
- [ ] `npm run check` (lint + typecheck + build) passes.
- [ ] Cross-browser check: latest Chrome, Safari (macOS + iOS), Firefox, Edge, Samsung Internet.
- [ ] Responsive check 320px → 1920px.
- [ ] All links and CTAs resolve; each CTA pre-selects the right inquiry type.

### Operations
- [ ] Domain, DNS, hosting, email provider and (future) analytics owned by company accounts, not individuals.
- [ ] Preview vs production environment variables configured; `NEXT_PUBLIC_ALLOW_INDEXING=true` **only** in production.
- [ ] Rollback procedure known (previous deployment promotion).
- [ ] Named owner for lead inbox and response SLA.
- [ ] Content update process agreed (code edit to `src/content/site.ts` vs future CMS).

---

## D. Release gates

Production launch requires **all** of the following:

1. **Claims gate** — every row in section A is *Approved* (with evidence on file) or *Removed* from `src/content/site.ts`.
2. **Assets gate** — no logo, photo, name or case study is published without documented permission.
3. **Legal gate** — Privacy Policy approved; draft notice removed.
4. **Quality gate** — `npm run check` passes; accessibility, performance and cross-browser checks in section C complete.
5. **Lead gate** — production test submissions for all inquiry types received in the agreed inbox.
6. **Config gate** — production env vars set and verified; indexing enabled only on production.
7. **Sign-off** — the named decision-maker approves the release.

---

## E. Open Priority-A decisions

| Decision | Options / notes | Owner | Status |
| -------- | --------------- | ----- | ------ |
| Final decision-maker for content, claims and release | Single named approver | — | Open |
| CMS | Stay with code-managed content (`src/content/site.ts`) or adopt a headless CMS | TBC | Open |
| CTA journeys | Confirm the four journeys (consultation, audit, quote, general) and where each CTA appears | TBC | Open |
| Lead destinations & SLA | Which inbox(es)/CRM receive each inquiry type; response-time commitment | TBC | Open |
| Target regions | Countries/states served — affects privacy obligations, copy and local SEO | TBC | Open |
| Ownership of domain, hosting, email and analytics accounts | Company-owned accounts, admin access list | TBC | Open |

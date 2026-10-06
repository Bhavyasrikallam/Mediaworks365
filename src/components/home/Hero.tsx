import { BadgeCheck } from "lucide-react";
import { claims, ctas, home } from "@/content/site";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";
import { HeroDial } from "./HeroDial";

/** Homepage hero. Renders the page's only <h1>. */
export function Hero() {
  const { hero } = home;

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* backdrop */}
      <div
        aria-hidden="true"
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-40 -z-10 size-[30rem] rounded-full bg-brand-500/20 blur-3xl sm:size-[40rem]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-40 -z-10 size-[22rem] rounded-full bg-brand-600/10 blur-3xl"
      />
      {/* faint ring behind the copy on small screens, where the dial is hidden */}
      <div
        aria-hidden="true"
        className="absolute top-10 -right-28 -z-10 size-72 rounded-full border border-brand-500/20 sm:-right-20 sm:size-96 lg:hidden"
      >
        <div className="absolute inset-8 rounded-full border border-dashed border-white/10" />
      </div>

      <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark" className="mb-6">
              {hero.eyebrow}
            </Eyebrow>
            <h1
              id="home-hero-title"
              className="text-[2.25rem] leading-[1.05] font-semibold sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {hero.title} <span className="text-gradient-brand block pt-1">{hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg lg:text-xl">{hero.subtitle}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={ctas.audit.href} arrow>
                {ctas.audit.label}
              </ButtonLink>
              <ButtonLink href={ctas.consultation.href} variant="ghost-dark">
                {ctas.consultation.label}
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Highlights">
              {home.highlightBadges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink-200"
                >
                  <BadgeCheck aria-hidden="true" className="size-4 shrink-0 text-brand-400" />
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <HeroDial className="mx-auto hidden w-full max-w-md lg:block" />
        </div>

        {/* highlight stats */}
        <dl className="mt-14 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:mt-16 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20">
          {claims.highlights.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 px-6 py-6 sm:px-8 sm:py-8">
              <dt className="text-sm text-ink-400 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} className="text-gradient-brand" />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

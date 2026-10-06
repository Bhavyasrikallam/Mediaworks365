import type { Metadata } from "next";
import { claims, portfolio, results } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio & Results",
  description: portfolio.intro,
  alternates: { canonical: "/portfolio" },
  openGraph: { url: "/portfolio", title: "Portfolio & Results", description: portfolio.intro },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={portfolio.title}
        intro={<p>{portfolio.intro}</p>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <Section tone="paper" aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">
          Work by category
        </h2>
        <PortfolioGallery />
      </Section>

      {/* UNVERIFIED claims — see header of src/content/site.ts before launch. */}
      <Section tone="dark" aria-labelledby="impact-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <SectionHeading id="impact-title" eyebrow="By the numbers" title={portfolio.impactTitle} tone="dark" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {claims.portfolioImpact.map((stat, i) => (
            <Reveal as="li" key={stat.metric} delay={i * 80}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <p className="font-display text-4xl font-semibold text-brand-400 sm:text-5xl">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <h3 className="mt-4 text-base font-semibold text-white">{stat.metric}</h3>
                <p className="mt-1.5 text-sm text-ink-400">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="light" aria-labelledby="results-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="results-title" eyebrow="Outcomes" title={results.title} intro={results.intro} />
          </div>
          <div className="lg:col-span-7">
            <ol className="divide-y divide-ink-100 border-y border-ink-100">
              {results.outcomes.map((outcome, i) => (
                <Reveal as="li" key={outcome} delay={i * 60} className="flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6">
                  <span aria-hidden="true" className="font-display text-sm font-semibold text-brand-700 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">{outcome}</span>
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 border-l-4 border-brand-500 pl-6 font-display text-xl leading-snug font-medium text-ink-900 sm:text-2xl">
              {results.closing}
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

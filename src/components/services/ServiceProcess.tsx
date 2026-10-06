import type { Service } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Numbered 3-step process. Stacked with a vertical rail on mobile, connected horizontally on lg. */
export function ServiceProcess({ service }: { service: Service }) {
  const headingId = "service-process-title";
  return (
    <Section tone="dark" aria-labelledby={headingId} className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <SectionHeading id={headingId} eyebrow="Process" title={service.processTitle} tone="dark" />

      <ol className="relative mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
        {/* Connector: vertical on mobile, horizontal through the badges on lg */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 w-px bg-linear-to-b from-brand-500/70 via-white/15 to-transparent lg:top-6 lg:right-[16%] lg:bottom-auto lg:left-[16%] lg:h-px lg:w-auto lg:bg-linear-to-r lg:from-brand-500/70 lg:via-brand-500/40 lg:to-brand-500/70"
        />
        {service.process.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 120} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
            <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-semibold text-ink-950 ring-8 ring-ink-950">
              <span className="sr-only">Step </span>
              {i + 1}
            </span>
            <div className="flex-1 rounded-card border border-white/10 bg-white/[0.03] p-6 lg:mt-6 lg:w-full lg:text-left">
              <h3 className="text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:text-base">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

import { home } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Numbered timeline: vertical rail on mobile/tablet, horizontal rail on lg+.
 * Hover/focus states are pure CSS.
 */
export function Process() {
  const steps = home.process.steps;

  return (
    <Section tone="paper" aria-labelledby="process-title">
      <Reveal>
        <SectionHeading id="process-title" title={home.process.title} align="center" />
      </Reveal>

      <ol className="relative mx-auto mt-12 max-w-xl lg:mt-20 lg:grid lg:max-w-none lg:grid-cols-5 lg:gap-6">
        {/* rail */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-brand-500 via-ink-300 to-ink-200 lg:top-6 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-gradient-to-r"
        />
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 110}
            className="group relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
          >
            <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-brand-500 bg-paper font-display text-base font-semibold text-ink-950 transition duration-300 group-hover:scale-110 group-hover:bg-brand-500">
              <span className="sr-only">Step </span>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5 lg:mt-6 lg:w-full lg:rounded-2xl lg:border lg:border-transparent lg:p-5 lg:pt-5 lg:transition lg:duration-300 lg:group-hover:border-ink-200 lg:group-hover:bg-white lg:group-hover:shadow-[0_20px_40px_-24px_rgb(8_8_10/0.3)]">
              <h3 className="text-xl font-semibold sm:text-2xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

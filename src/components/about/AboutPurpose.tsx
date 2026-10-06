import { Compass, Eye } from "lucide-react";
import { about } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Mission & Vision, side by side on larger screens and stacked on phones. */
export function AboutPurpose() {
  const cards = [
    { ...about.mission, icon: Compass, dark: true },
    { ...about.vision, icon: Eye, dark: false },
  ];

  return (
    <Section tone="paper" aria-labelledby="about-purpose-title">
      <SectionHeading id="about-purpose-title" eyebrow="Our Purpose" title="Why we do what we do" />
      <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:gap-8">
        {cards.map(({ title, body, icon: CardIcon, dark }, i) => (
          <Reveal as="article" delay={i * 100} key={title} className="h-full">
            <div
              className={
                dark
                  ? "relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink-950 p-7 text-white sm:p-10"
                  : "relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink-200 bg-white p-7 text-ink-900 sm:p-10"
              }
            >
              <div
                aria-hidden="true"
                className={
                  dark
                    ? "absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-brand-500/25 blur-3xl"
                    : "absolute -right-20 -bottom-20 -z-10 size-56 rounded-full bg-brand-300/30 blur-3xl"
                }
              />
              <span
                className={
                  dark
                    ? "inline-flex size-14 items-center justify-center rounded-2xl bg-brand-500 text-ink-950"
                    : "inline-flex size-14 items-center justify-center rounded-2xl bg-ink-950 text-brand-400"
                }
              >
                <CardIcon aria-hidden="true" className="size-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-2xl font-semibold sm:text-3xl">{title}</h3>
              <p className={dark ? "mt-4 text-base leading-relaxed text-ink-300 sm:text-lg" : "mt-4 text-base leading-relaxed text-ink-600 sm:text-lg"}>
                {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

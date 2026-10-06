import { claims, home } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function SuccessStories() {
  return (
    <Section tone="light" aria-labelledby="success-title">
      <Reveal>
        <SectionHeading id="success-title" title={home.successStories.title} />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
        {claims.successStories.map((story, i) => (
          <Reveal
            as="li"
            key={story.label}
            delay={i * 90}
            className={
              i === 0
                ? "relative isolate flex min-h-52 flex-col justify-between overflow-hidden rounded-[2rem] bg-ink-950 p-7 text-white sm:p-8"
                : "relative isolate flex min-h-52 flex-col justify-between overflow-hidden rounded-[2rem] border border-ink-200 bg-paper p-7 sm:p-8"
            }
          >
            {i === 0 && (
              <div aria-hidden="true" className="absolute -right-16 -bottom-16 -z-10 size-48 rounded-full bg-brand-500/30 blur-2xl" />
            )}
            <span aria-hidden="true" className={i === 0 ? "h-1 w-10 rounded-full bg-brand-500" : "h-1 w-10 rounded-full bg-ink-900"} />
            <p className="mt-10">
              <span
                className={`block font-display text-4xl leading-none font-semibold tracking-tight break-words sm:text-5xl lg:text-4xl xl:text-5xl ${
                  i === 0 ? "text-gradient-brand" : "text-ink-950"
                }`}
              >
                {story.value}
              </span>
              <span className={`mt-3 block text-base leading-snug ${i === 0 ? "text-ink-300" : "text-ink-600"}`}>
                {story.label}
              </span>
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

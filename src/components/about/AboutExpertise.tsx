import { about } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** Six capability cards driven by `about.expertise`. */
export function AboutExpertise() {
  return (
    <Section tone="light" aria-labelledby="about-expertise-title">
      <SectionHeading id="about-expertise-title" eyebrow="Capabilities" title={about.expertise.title} />
      <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {about.expertise.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={(i % 3) * 80}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-300 hover:shadow-[0_20px_50px_-24px_rgb(8_8_10/0.35)] motion-reduce:transform-none motion-reduce:transition-none sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink-950 text-brand-400">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-ink-950">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

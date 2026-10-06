import { Check } from "lucide-react";
import { about } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Outcomes list on a dark band: intro on the left, numbered outcomes on the right. */
export function AboutDeliver() {
  const { title, intro, lead, items } = about.deliver;

  return (
    <section aria-labelledby="about-deliver-title" className="relative isolate overflow-hidden bg-ink-950 py-16 text-white sm:py-20 lg:py-28">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_left,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute bottom-[-12rem] left-[-8rem] -z-10 size-[26rem] rounded-full bg-brand-500/15 blur-3xl" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow tone="dark" className="mb-4">
                Outcomes
              </Eyebrow>
              <h2 id="about-deliver-title" className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-200 sm:text-xl">{intro}</p>
              <p className="mt-8 text-sm font-semibold tracking-[0.14em] text-brand-400 uppercase">{lead}</p>
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-7">
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 60}
                className={i === items.length - 1 && items.length % 2 === 1 ? "sm:col-span-2" : undefined}
              >
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-500/50 hover:bg-white/[0.06] sm:p-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-semibold text-brand-400 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base leading-snug font-medium text-white sm:text-lg">{item}</span>
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink-950">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

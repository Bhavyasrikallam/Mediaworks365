import { Check } from "lucide-react";
import { home } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div aria-hidden="true" className="absolute top-1/2 -left-48 -z-10 size-[26rem] -translate-y-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="why-title" tone="dark" title={home.whyChooseUs.title} />
            <div aria-hidden="true" className="mt-8 hidden lg:block">
              <span className="font-display text-[7rem] leading-none font-semibold text-white/[0.06] xl:text-[9rem]">
                365
              </span>
            </div>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
            {home.whyChooseUs.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 2) * 80 + Math.floor(i / 2) * 40}
                className="group flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-brand-500/50 hover:bg-white/[0.06] sm:p-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-500 text-ink-950">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
                <span className="text-base font-medium text-ink-100 sm:text-lg">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { home, services } from "@/content/site";
import { ButtonLink, Section, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesGrid() {
  return (
    <Section tone="paper" aria-labelledby="services-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <SectionHeading id="services-title" title={home.servicesIntro.title} intro={home.servicesIntro.body} />
        </Reveal>
        <Reveal delay={100} className="shrink-0">
          <ButtonLink href="/services" variant="ghost-light" arrow>
            All services
          </ButtonLink>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {services.map((service, i) => (
          <Reveal as="li" key={service.slug} delay={(i % 3) * 90} className="h-full">
            <article className="group relative flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition duration-300 focus-within:border-ink-900 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_50px_-24px_rgb(8_8_10/0.35)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-ink-950 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <span aria-hidden="true" className="font-display text-sm font-medium text-ink-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                <Link
                  href={`/services/${service.slug}`}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-4 focus-visible:after:outline-brand-500"
                >
                  {service.name}
                </Link>
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-600">{service.summary}</p>
              <span
                aria-hidden="true"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
              >
                Learn more
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

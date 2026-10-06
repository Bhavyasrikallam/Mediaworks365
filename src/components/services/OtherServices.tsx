import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, type ServiceSlug } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";

/** Cross-links to every service except the current one. */
export function OtherServices({ current }: { current: ServiceSlug }) {
  const headingId = "other-services-title";
  const others = services.filter((s) => s.slug !== current);

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <SectionHeading id={headingId} eyebrow="Explore" title="Other services" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {others.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full min-h-28 flex-col justify-between gap-6 rounded-card border border-ink-200 bg-paper p-5 transition-colors hover:border-ink-900 hover:bg-white"
            >
              <span className="flex items-start justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-ink-950 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
                />
              </span>
              <span className="font-display text-base font-semibold text-ink-900">{s.shortName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

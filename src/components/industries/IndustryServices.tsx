import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";

/** Links every industry to the service pages: one chip per service. */
export function IndustryServices() {
  return (
    <Section tone="dark" aria-labelledby="industries-services-title" className="relative isolate overflow-hidden">
      <SectionHeading
        id="industries-services-title"
        eyebrow="Our Services"
        title={
          <>
            Every industry, <span className="text-gradient-brand">every channel</span>
          </>
        }
        intro="Whichever market you compete in, the same full-service toolkit is available to you — online and in the real world."
        tone="dark"
      />
      <ul className="mt-10 flex flex-wrap gap-3 sm:mt-12">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-2 pr-4 pl-2 text-sm font-medium text-white transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-ink-950 sm:text-base"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-500 text-ink-950 transition-colors group-hover:bg-ink-950 group-hover:text-brand-400">
                <Icon name={s.icon} className="size-4" />
              </span>
              {s.name}
              <ArrowUpRight aria-hidden="true" className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 motion-reduce:transform-none" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

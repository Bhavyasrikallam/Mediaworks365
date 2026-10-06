import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";

/** Grid of included deliverables (only some services define `includes`). */
export function ServiceIncludes({ title, items }: { title: string; items: readonly string[] }) {
  const headingId = "service-includes-title";
  return (
    <Section tone="paper" aria-labelledby={headingId}>
      <SectionHeading id={headingId} eyebrow="What you get" title={title} />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex min-h-16 items-center gap-4 rounded-card border border-ink-200 bg-white px-5 py-4 text-base font-medium text-ink-900"
          >
            <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-700">
              <Check className="size-4" strokeWidth={2.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/primitives";

/**
 * Readable long-form layout for policy pages. @tailwindcss/typography is not
 * installed, so element styles are applied with descendant variants.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-paper py-14 text-ink-900 sm:py-20">
      <Container>
        <div
          className={[
            "mx-auto max-w-3xl text-base leading-relaxed text-ink-700 sm:text-lg",
            "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:text-ink-950 sm:[&_h2]:text-3xl",
            "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-950 sm:[&_h3]:text-xl",
            "[&_p]:mt-4",
            "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:marker:text-brand-600",
            "[&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:decoration-brand-500/60 [&_a]:underline-offset-4 hover:[&_a]:decoration-brand-700",
            "[&_strong]:font-semibold [&_strong]:text-ink-900",
          ].join(" ")}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Visually distinct notice for content that has not yet been approved. */
export function DraftNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside
      role="note"
      aria-label={title}
      className="mb-10 flex gap-4 rounded-[var(--radius-card)] border-2 border-brand-500 bg-brand-500/10 p-5 text-ink-900 sm:p-6"
    >
      <AlertTriangle aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand-700" />
      <div className="text-base [&_p]:mt-1!">
        <strong className="block font-semibold text-ink-950">{title}</strong>
        {children}
      </div>
    </aside>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return <p className="mt-0! text-sm text-ink-500">Last updated: {date}</p>;
}

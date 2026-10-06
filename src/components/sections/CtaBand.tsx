import { ctas, home } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Closing conversion band used at the bottom of most pages. */
export function CtaBand({
  title = home.finalCta.title,
  body = home.finalCta.body,
  primary = ctas.scheduleConsultation,
  secondary = ctas.audit,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section aria-labelledby="cta-band-title" className="bg-paper py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-60" />
            <div aria-hidden="true" className="absolute -bottom-32 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />
            <h2 id="cta-band-title" className="mx-auto max-w-3xl text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-300 sm:text-lg">{body}</p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={primary.href} arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="ghost-dark">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

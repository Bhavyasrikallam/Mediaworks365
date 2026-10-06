import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";

/** Dark inner-page hero with optional breadcrumb trail. Use one per page (it renders the <h1>). */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[28rem] rounded-full bg-brand-500/20 blur-3xl sm:size-[36rem]"
      />
      <Container className="py-16 sm:py-20 lg:py-28">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              {breadcrumbs.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5" />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white">
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-200">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-4xl">
          {eyebrow && (
            <Eyebrow tone="dark" className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

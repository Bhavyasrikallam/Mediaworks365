import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { ctas } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden="true"
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl sm:size-[36rem]"
      />
      <Container className="flex min-h-[70dvh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <p
          aria-hidden="true"
          className="font-display text-[7rem] leading-none font-semibold tracking-tight text-brand-500 sm:text-[10rem] lg:text-[12rem]"
        >
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
          <span className="sr-only">404 — </span>This page is off the map.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead.
        </p>
        <nav
          aria-label="Helpful links"
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <ButtonLink href="/" arrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost-dark">
            Explore Services
          </ButtonLink>
          <ButtonLink href={ctas.contact.href} variant="ghost-dark">
            Contact Us
          </ButtonLink>
        </nav>
      </Container>
    </section>
  );
}

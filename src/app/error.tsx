"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Container, buttonClasses } from "@/components/ui/primitives";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    // Wire an error-reporting service in here once one is chosen.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ink-950 text-white">
      <Container className="flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand-400 uppercase">Unexpected error</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">Something went wrong.</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
          We couldn&apos;t load this part of the page. Please try again — if the problem continues, get in touch and
          we&apos;ll help.
        </p>
        {error.digest && <p className="mt-3 font-mono text-xs text-ink-400">Reference: {error.digest}</p>}
        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button type="button" onClick={() => retry()} className={buttonClasses("primary", "cursor-pointer")}>
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link href="/contact?type=contact" className={buttonClasses("ghost-dark")}>
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}

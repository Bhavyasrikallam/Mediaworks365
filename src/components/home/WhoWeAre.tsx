import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home, site } from "@/content/site";
import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeAre() {
  return (
    <Section tone="paper" aria-labelledby="who-we-are-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 id="who-we-are-title" className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
            {home.whoWeAre.title}
          </h2>
          <div aria-hidden="true" className="mt-6 h-1 w-16 rounded-full bg-brand-500" />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-8">
          <p className="text-xl leading-snug font-medium text-ink-800 sm:text-2xl lg:text-3xl lg:leading-snug">
            {home.whoWeAre.body}
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            More about {site.name}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

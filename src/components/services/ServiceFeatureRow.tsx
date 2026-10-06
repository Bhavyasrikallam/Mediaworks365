import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ServiceVisualPanel } from "./ServiceVisualPanel";

/** Large alternating feature row used on the /services index. */
export function ServiceFeatureRow({ service, index }: { service: Service; index: number }) {
  const titleId = `service-row-${service.slug}`;
  const reversed = index % 2 === 1;

  return (
    <Reveal as="article" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={cn(reversed && "lg:order-2")}>
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-2xl bg-ink-950 text-brand-400">
            <Icon name={service.icon} className="size-6" />
          </span>
          <span aria-hidden="true" className="font-display text-sm font-semibold tracking-[0.18em] text-ink-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 id={titleId} className="mt-6 text-2xl leading-tight font-semibold text-ink-900 sm:text-3xl">
          {service.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">{service.tagline}</p>

        <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">How it works</p>
        <ol className="mt-4 space-y-3">
          {service.process.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3 text-sm text-ink-800 sm:text-base">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-xs font-semibold text-ink-700"
              >
                {i + 1}
              </span>
              {step.title}
            </li>
          ))}
        </ol>

        <Link
          href={`/services/${service.slug}`}
          className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b-2 border-brand-500 py-2 font-semibold text-ink-900 transition-colors hover:border-ink-900"
        >
          Explore {service.shortName}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ServiceVisualPanel service={service} className={cn(reversed && "lg:order-1")} />
    </Reveal>
  );
}

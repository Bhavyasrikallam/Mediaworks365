"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getService, portfolio } from "@/content/site";
import { cn } from "@/lib/cn";
import { WorkCover } from "./WorkCover";

type Filter = "All" | (typeof portfolio.categories)[number];
const filters: Filter[] = ["All", ...portfolio.categories];

// Stable per-item variant index within its category, so covers differ.
const variants = portfolio.items.map(
  (item, i) => portfolio.items.slice(0, i).filter((other) => other.category === item.category).length,
);

export function PortfolioGallery() {
  const [active, setActive] = useState<Filter>("All");
  // Only animate after the first user interaction so the initial render never flashes.
  const [interacted, setInteracted] = useState(false);

  const visible = portfolio.items
    .map((item, i) => ({ item, variant: variants[i] }))
    .filter(({ item }) => active === "All" || item.category === active);

  const countLabel = `Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}${
    active === "All" ? "" : ` in ${active}`
  }`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter work by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const pressed = f === active;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={pressed}
                onClick={() => {
                  setActive(f);
                  setInteracted(true);
                }}
                className={cn(
                  "min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                  pressed
                    ? "border-ink-950 bg-ink-950 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:text-ink-950",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" aria-atomic="true" className="text-sm text-ink-500">
          {countLabel}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ item, variant }, i) => {
          const service = getService(item.service);
          return (
            <li
              // Re-key on filter change so @starting-style replays the entrance transition.
              key={`${active}-${item.title}`}
              style={interacted ? { transitionDelay: `${Math.min(i, 5) * 60}ms` } : undefined}
              className={cn(
                interacted &&
                  "transition-[opacity,translate] duration-500 ease-out starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:translate-y-0 motion-reduce:starting:opacity-100",
              )}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[0_20px_60px_-40px_rgb(8_8_10/0.35)] transition-shadow hover:shadow-[0_30px_70px_-35px_rgb(8_8_10/0.45)]">
                <WorkCover category={item.category} variant={variant} icon={service?.icon ?? "sparkles"} />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">{item.category}</p>
                  <h3 className="mt-3 text-xl font-semibold text-ink-950">{item.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-ink-600">{item.body}</p>
                  {service && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-ink-950 underline-offset-4 hover:underline"
                    >
                      <span>
                        <span className="sr-only">Related service: </span>
                        {service.shortName}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-brand-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      />
                    </Link>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-sm text-ink-500">{portfolio.showcaseNote}</p>
    </div>
  );
}

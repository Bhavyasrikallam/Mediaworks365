import Link from "next/link";
import { ArrowUpRight, Globe, MapPin } from "lucide-react";
import { services, type ServiceSlug } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";

const groups: { id: string; title: string; body: string; icon: typeof Globe; slugs: ServiceSlug[] }[] = [
  {
    id: "digital",
    title: "Digital",
    body: "Be found, recognized and chosen on every screen.",
    icon: Globe,
    slugs: ["seo", "digital-branding"],
  },
  {
    id: "experiential",
    title: "Experiential & Real-World",
    body: "Own the physical moments where purchase decisions are made.",
    icon: MapPin,
    slugs: ["store-branding", "on-ground-activations", "event-integration", "out-of-home"],
  },
];

/** Groups services into digital vs. real-world channels. */
export function ServiceGroups() {
  const headingId = "service-groups-title";
  return (
    <Section tone="dark" aria-labelledby={headingId} className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -bottom-40 left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <SectionHeading
        id={headingId}
        eyebrow="Two channels, one strategy"
        title={
          <>
            Online <span className="text-gradient-brand">and</span> on the ground
          </>
        }
        tone="dark"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {groups.map((g) => {
          const GroupIcon = g.icon;
          const items = g.slugs.map((slug) => services.find((s) => s.slug === slug)!);
          return (
            <article
              key={g.id}
              aria-labelledby={`group-${g.id}`}
              className={`rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8 ${g.slugs.length > 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
                  <GroupIcon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 id={`group-${g.id}`} className="text-xl font-semibold text-white sm:text-2xl">
                  {g.title}
                </h3>
              </div>
              <p className="mt-4 text-ink-300">{g.body}</p>
              <ul className={`mt-6 grid gap-3 ${g.slugs.length > 2 ? "sm:grid-cols-2" : ""}`}>
                {items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex min-h-14 items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-white transition-colors hover:border-brand-500/60 hover:bg-white/5"
                    >
                      <Icon name={s.icon} className="size-5 shrink-0 text-brand-400" />
                      <span className="flex-1 font-medium">{s.shortName}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-400"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

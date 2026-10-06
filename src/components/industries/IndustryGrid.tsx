import {
  Building2,
  Car,
  Cpu,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  Hotel,
  Landmark,
  Scale,
  ShoppingBag,
  ShoppingCart,
  Briefcase,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const industryIcons: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  "Real Estate": Building2,
  Legal: Scale,
  Construction: HardHat,
  "Home Services": Wrench,
  Restaurants: UtensilsCrossed,
  Retail: ShoppingBag,
  "E-commerce": ShoppingCart,
  Automotive: Car,
  Education: GraduationCap,
  "Financial Services": Landmark,
  Technology: Cpu,
  Manufacturing: Factory,
  Hospitality: Hotel,
};

/** Curated index of every industry served (no thin per-industry pages yet). */
export function IndustryGrid() {
  return (
    <Section tone="paper" aria-labelledby="industries-grid-title">
      <SectionHeading id="industries-grid-title" eyebrow="Sectors" title="Built for the markets you compete in" />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {industries.items.map((name, i) => {
          const IndustryIcon = industryIcons[name] ?? Briefcase;
          return (
            <Reveal as="li" key={name} delay={(i % 4) * 60}>
              <div className="group relative isolate flex h-full min-h-32 flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-ink-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950 hover:shadow-[0_18px_40px_-22px_rgb(8_8_10/0.4)] motion-reduce:transform-none motion-reduce:transition-none sm:min-h-40 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -bottom-10 -z-10 size-28 rounded-full bg-brand-300/0 blur-2xl transition-colors duration-300 group-hover:bg-brand-300/40"
                />
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink-950 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950 sm:size-12">
                  <IndustryIcon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-base leading-tight font-semibold break-words text-ink-950 sm:text-lg">{name}</h3>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

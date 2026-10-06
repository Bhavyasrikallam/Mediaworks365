import type { Metadata } from "next";
import { ctas, industries } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { IndustryGrid } from "@/components/industries/IndustryGrid";
import { IndustryServices } from "@/components/industries/IndustryServices";

const intro = `${industries.intro.replace(/:$/, "")} ${industries.items.slice(0, -1).join(", ")}, and ${industries.items.at(-1)}.`;

export const metadata: Metadata = {
  title: "Industries",
  description: intro,
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={industries.title}
        intro={<p>{intro}</p>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <IndustryGrid />
      <IndustryServices />
      <CtaBand
        title="Don't see your industry?"
        body="Let's talk about your market and goals."
        primary={ctas.consultation}
        secondary={ctas.contact}
      />
    </>
  );
}

import type { Metadata } from "next";
import { about } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { AboutPurpose } from "@/components/about/AboutPurpose";
import { AboutDeliver } from "@/components/about/AboutDeliver";
import { AboutExpertise } from "@/components/about/AboutExpertise";
import { AboutExperts } from "@/components/about/AboutExperts";

export const metadata: Metadata = {
  title: "About Us",
  description: about.hero.body[1],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [lead, ...rest] = about.hero.body;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        intro={
          <div className="space-y-4">
            <p className="text-xl leading-snug font-medium text-white sm:text-2xl">{lead}</p>
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
      />
      <AboutPurpose />
      <AboutDeliver />
      <AboutExpertise />
      <AboutExperts />
      <CtaBand />
    </>
  );
}

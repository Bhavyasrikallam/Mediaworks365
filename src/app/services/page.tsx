import type { Metadata } from "next";
import { ctas, home, services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, Section, SectionHeading } from "@/components/ui/primitives";
import { ServiceFeatureRow } from "@/components/services/ServiceFeatureRow";
import { ServiceGroups } from "@/components/services/ServiceGroups";

const description = home.servicesIntro.body;

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services", description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Marketing that works <span className="text-gradient-brand">online and on the ground</span>
          </>
        }
        intro={home.servicesIntro.body}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctas.quote.href} arrow>
            {ctas.quote.label}
          </ButtonLink>
          <ButtonLink href={ctas.consultation.href} variant="ghost-dark">
            {ctas.consultation.label}
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="paper" aria-labelledby="services-list-title">
        <SectionHeading
          id="services-list-title"
          eyebrow="What we do"
          title={home.servicesIntro.title}
          intro={`${services.length} specialist services, one accountable team.`}
        />
        <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-24 lg:space-y-32">
          {services.map((service, i) => (
            <ServiceFeatureRow key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Section>

      <ServiceGroups />

      <CtaBand primary={ctas.quote} secondary={ctas.consultation} />
    </>
  );
}

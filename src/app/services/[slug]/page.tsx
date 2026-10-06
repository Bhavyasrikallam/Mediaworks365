import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ctas, getService, services } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceHeroMotif } from "@/components/services/ServiceHeroMotif";
import { ServiceVisualPanel } from "@/components/services/ServiceVisualPanel";
import { ServiceIncludes } from "@/components/services/ServiceIncludes";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { OtherServices } from "@/components/services/OtherServices";
import { ServiceJsonLd } from "@/components/services/ServiceJsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: service.name, description: service.tagline, url: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const powerId = "service-power-title";

  return (
    <>
      <div className="relative">
        <PageHero
          eyebrow="Services"
          title={service.name}
          intro={service.tagline}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortName }]}
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
        <ServiceHeroMotif icon={service.icon} />
      </div>

      <Section tone="light" aria-labelledby={powerId}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading id={powerId} eyebrow="Why it matters" title={service.powerTitle} />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">{service.power}</p>
          </Reveal>
          <Reveal delay={120}>
            <ServiceVisualPanel service={service} />
          </Reveal>
        </div>
      </Section>

      {"includes" in service && <ServiceIncludes title={service.includesTitle} items={service.includes} />}

      <ServiceProcess service={service} />

      <OtherServices current={service.slug} />

      <CtaBand
        title={`Ready to put ${service.shortName} to work?`}
        primary={ctas.quote}
        secondary={ctas.consultation}
      />

      <ServiceJsonLd service={service} />
    </>
  );
}

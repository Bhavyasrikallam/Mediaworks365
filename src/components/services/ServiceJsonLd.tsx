import { site, type Service } from "@/content/site";

/** BreadcrumbList + Service structured data for a service detail page. */
export function ServiceJsonLd({ service }: { service: Service }) {
  const pageUrl = `${site.url}/services/${service.slug}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: service.shortName, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.tagline,
      url: pageUrl,
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Static, server-generated data only — never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

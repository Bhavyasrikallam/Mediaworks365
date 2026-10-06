import { describe, expect, it } from "vitest";
import { ctas, getService, industries, inquiryTypes, navigation, services } from "@/content/site";

const typeOf = (href: string) => new URL(href, "http://localhost").searchParams.get("type");

describe("site content integrity", () => {
  it("has 6 services with unique, URL-safe slugs", () => {
    expect(services).toHaveLength(6);
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it.each(services.map((s) => [s.slug, s] as const))("%s has 3 complete process steps", (_slug, service) => {
    expect(service.process).toHaveLength(3);
    for (const step of service.process) {
      expect(step.title.trim()).not.toBe("");
      expect(step.body.trim()).not.toBe("");
    }
    expect(service.name.trim()).not.toBe("");
    expect(service.summary.trim()).not.toBe("");
  });

  it("getService resolves every slug and rejects unknown ones", () => {
    for (const s of services) expect(getService(s.slug)).toBe(s);
    expect(getService("nope")).toBeUndefined();
  });

  it("lists 14 unique industries", () => {
    expect(industries.items).toHaveLength(14);
    expect(new Set(industries.items).size).toBe(14);
  });

  it("navigation Services children match the services list", () => {
    const servicesNav = navigation.find((n) => n.href === "/services");
    expect(servicesNav?.children).toEqual(services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })));
  });

  it("top-level navigation hrefs are unique internal paths", () => {
    const hrefs = navigation.map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href.startsWith("/")).toBe(true);
  });

  it("every CTA links to /contact?type=<valid inquiry type>", () => {
    const valid = new Set<string>(inquiryTypes.map((t) => t.value));
    for (const [key, cta] of Object.entries(ctas)) {
      expect(new URL(cta.href, "http://localhost").pathname, key).toBe("/contact");
      expect(valid.has(typeOf(cta.href) ?? ""), `${key}: ${cta.href}`).toBe(true);
      expect(cta.label.trim(), key).not.toBe("");
    }
  });

  it("every inquiry type is reachable from at least one CTA", () => {
    const linked = new Set(Object.values(ctas).map((c) => typeOf(c.href)));
    for (const t of inquiryTypes) expect(linked.has(t.value), t.value).toBe(true);
  });
});

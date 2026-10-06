import Link from "next/link";
import { ctas, navigation, services, site } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, address, hours } = site.contact;
  const hasContact = Boolean(email || phone || address || hours);

  return (
    <footer className="bg-ink-950 text-ink-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={ctas.audit.href} size="sm">
                {ctas.audit.label}
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer — company" className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-white">Company</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navigation
                .filter((n) => !n.children)
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services" className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">Services</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="break-all hover:text-white">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                    {phone}
                  </a>
                </li>
              )}
              {address && <li className="not-italic">{address}</li>}
              {hours && <li>{hours}</li>}
              {!hasContact && (
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Send us a message →
                  </Link>
                </li>
              )}
              <li>
                <Link href={ctas.quote.href} className="hover:text-white">
                  {ctas.quote.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

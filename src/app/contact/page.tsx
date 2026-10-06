import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactPage, site } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { nextSteps } from "@/components/contact/copy";
import { parseInquiryType } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactPage.body[0],
  // Every ?type= journey canonicalizes to the single contact page.
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact ${site.name}`, description: contactPage.body[0] },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { type } = await searchParams;
  const initialType = parseInquiryType(type);

  const { email, phone, address, hours } = site.contact;
  const details = [
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    address && { icon: MapPin, label: "Address", value: address },
    hours && { icon: Clock, label: "Business hours", value: hours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={<p>{contactPage.body[0]}</p>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section aria-label="Contact form and details" className="bg-paper py-12 sm:py-16 lg:py-24">
        <Container>
          {/* Form first in source (and on mobile); the supporting panel sits left on desktop. */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <ContactForm initialType={initialType} fallbackEmail={email || undefined} />
            </div>
            <aside aria-label="About your inquiry" className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
              <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-ink-950 p-6 text-white sm:p-8 lg:sticky lg:top-28">
                <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 opacity-50" />
                <div aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand-500/20 blur-3xl" />

                <p className="text-lg leading-relaxed text-ink-200">{contactPage.body[1]}</p>

                <h2 className="mt-10 text-xl font-semibold sm:text-2xl">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-500/40 bg-brand-500/10 font-display text-sm font-semibold text-brand-400"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-white">
                          <span className="sr-only">Step {i + 1}: </span>
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-300">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {details.length > 0 && (
                  <>
                    <h2 className="mt-10 text-xl font-semibold sm:text-2xl">Contact details</h2>
                    <ul className="mt-5 space-y-3">
                      {details.map(({ icon: IconCmp, label, value, href }) => (
                        <li key={label} className="flex items-start gap-3">
                          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/5 text-brand-400">
                            <IconCmp aria-hidden="true" className="size-4.5" />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-xs font-semibold tracking-wider text-ink-400 uppercase">{label}</p>
                            {href ? (
                              <a
                                href={href}
                                className="inline-flex min-h-11 items-center break-all text-white underline-offset-4 hover:underline"
                              >
                                {value}
                              </a>
                            ) : (
                              <p className="text-white">{value}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>

          </div>
        </Container>
      </section>
    </>
  );
}

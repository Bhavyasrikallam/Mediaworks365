import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { DraftNotice, LastUpdated, Prose } from "@/components/legal/Prose";
import { inquiryTypes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you share with us through this website.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: `Privacy Policy | ${site.name}` },
};

export default function PrivacyPage() {
  const email = site.contact.email;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="What we collect when you contact us, why we collect it, and the choices you have."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <Prose>
        <DraftNotice title="Draft — pending legal review">
          <p>
            This policy is a working draft and has not yet been approved by legal counsel. Wording, retention periods and
            processor details may change before launch.
          </p>
        </DraftNotice>

        <LastUpdated date="Draft — not yet in effect" />

        <p>
          {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains how we handle
          personal information collected through this website.
        </p>

        <h2 id="what-we-collect">Information we collect</h2>
        <p>
          We only collect personal information that you choose to send us through the contact form. That may include:
        </p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number (optional)</li>
          <li>Your company name (optional)</li>
          <li>Your message</li>
          <li>The type of inquiry you select ({inquiryTypes.map((t) => t.label).join(", ")})</li>
          <li>
            Depending on the inquiry type, the service you&apos;re interested in, your website address (for audits) and an
            indicative budget range (for quotes)
          </li>
          <li>Your confirmation that you agree to be contacted about your inquiry</li>
        </ul>
        <p>
          Like most websites, our hosting provider may automatically process technical data such as IP address, browser
          type and request time in server logs, for security and to keep the site running.
        </p>

        <h2 id="how-we-use">How we use your information</h2>
        <p>
          We use the information you submit solely to respond to your inquiry — for example, to arrange a consultation,
          prepare a marketing audit or quote, or answer a general question. We do not sell your personal information and
          we do not use it for unrelated marketing without your consent.
        </p>

        <h2 id="processors">Who we share it with</h2>
        <p>We share personal information only with service providers that help us operate this website, namely:</p>
        <ul>
          <li>
            <strong>Email delivery provider</strong> — form submissions are delivered to our team by email through a
            transactional email service (currently Resend).
          </li>
          <li>
            <strong>Website hosting provider</strong> — hosts the site and processes the technical request data
            described above.
          </li>
        </ul>
        <p>
          These providers act on our instructions and may only use the information to provide their service to us. We may
          also disclose information where required by law.
        </p>

        <h2 id="retention">How long we keep it</h2>
        <p>
          We keep inquiry information only for as long as needed to respond to you and manage any resulting business
          relationship. <strong>[Retention period to be confirmed — e.g. 24 months from last contact.]</strong> After that,
          it is deleted.
        </p>

        <h2 id="your-rights">Your rights and requests</h2>
        <p>
          Depending on where you live, you may have the right to request access to, correction of, or deletion of the
          personal information we hold about you, and to object to or restrict how we use it. To make a request, contact
          us using the details below. We will respond within the time required by applicable law.
        </p>

        <h2 id="cookies">Cookies and analytics</h2>
        <p>
          This website does not currently set any non-essential cookies, and we do not use analytics, advertising or
          tracking tools. If that changes, we will update this policy and ask for your consent where required before any
          non-essential cookies are set.
        </p>

        <h2 id="security">Security</h2>
        <p>
          The site is served over HTTPS and we use reasonable technical and organisational measures to protect the
          information you send us. No method of transmission over the internet is completely secure, however.
        </p>

        <h2 id="changes">Changes to this policy</h2>
        <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows the latest version.</p>

        <h2 id="contact">Contact us</h2>
        <p>
          For questions about this policy or to make a privacy request,{" "}
          {email ? (
            <>
              email <a href={`mailto:${email}`}>{email}</a> or use our <Link href="/contact?type=contact">contact form</Link>.
            </>
          ) : (
            <>
              please use our <Link href="/contact?type=contact">contact form</Link> and mention &ldquo;privacy&rdquo; in
              your message.
            </>
          )}
        </p>
      </Prose>
    </>
  );
}

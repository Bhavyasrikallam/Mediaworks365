import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { LastUpdated, Prose } from "@/components/legal/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${site.name} is committed to making this website usable for everyone. Read our accessibility commitment and how to give feedback.`,
  alternates: { canonical: "/accessibility" },
  openGraph: { url: "/accessibility", title: `Accessibility Statement | ${site.name}` },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility Statement"
        intro="We want everyone to be able to use this website, whatever device, browser or assistive technology they rely on."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      />
      <Prose>
        <LastUpdated date="Pre-launch review" />

        <h2 id="commitment">Our commitment</h2>
        <p>
          {site.name} aims to conform to the{" "}
          <a href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer">
            Web Content Accessibility Guidelines (WCAG) 2.2
          </a>{" "}
          at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of
          disabilities, including visual, auditory, motor and cognitive impairments.
        </p>

        <h2 id="measures">Measures we take</h2>
        <ul>
          <li>Semantic HTML with a logical heading structure and one main heading per page.</li>
          <li>A &ldquo;Skip to content&rdquo; link and full keyboard navigation, with a clearly visible focus indicator.</li>
          <li>Text and interface colours chosen to meet WCAG AA contrast ratios.</li>
          <li>Layouts that adapt from small phones to large screens and support zoom up to 400% without loss of content.</li>
          <li>Animations that respect your device&apos;s &ldquo;reduce motion&rdquo; setting.</li>
          <li>Form fields with visible labels, clear error messages and accessible status announcements.</li>
          <li>Descriptive text alternatives for meaningful images; decorative images are hidden from assistive technology.</li>
          <li>Touch targets sized for comfortable use on mobile devices.</li>
        </ul>

        <h2 id="limitations">Known limitations</h2>
        <p>
          The site is being tested ahead of launch and we are not yet aware of specific barriers. Some areas still being
          reviewed include:
        </p>
        <ul>
          <li>Testing with a full range of screen readers and browser combinations.</li>
          <li>Future images, video and case-study content, which will need text alternatives and captions as it is added.</li>
          <li>Any third-party tools added later, which may not be fully within our control.</li>
        </ul>
        <p>We will update this statement as issues are found and fixed.</p>

        <h2 id="feedback">Feedback and assistance</h2>
        <p>
          If you have difficulty using any part of this website, or have suggestions for improvement, please{" "}
          <Link href="/contact?type=contact">contact us</Link>
          {site.contact.email && (
            <>
              {" "}
              or email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </>
          )}
          . Tell us the page address and the problem you encountered, and we will do our best to provide the information
          in another format and fix the issue.
        </p>

        <h2 id="assessment">Assessment approach</h2>
        <p>
          We assess accessibility through automated checks during development and manual testing with keyboard-only
          navigation, screen readers and browser zoom.
        </p>
      </Prose>
    </>
  );
}

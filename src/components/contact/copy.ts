import type { InquiryType } from "@/content/site";

/**
 * Contact-journey microcopy. Not in the supplied content document.
 * TODO(content): move into src/content/site.ts (`contactPage`) once approved.
 */
export const inquiryCopy: Record<InquiryType, { heading: string; helper: string; messagePlaceholder: string }> = {
  consultation: {
    heading: "Book a free consultation",
    helper: "Tell us about your business and goals, and we'll set up a no-obligation strategy conversation.",
    messagePlaceholder: "What would you like to achieve? (optional)",
  },
  audit: {
    heading: "Request a free marketing audit",
    helper: "Share your website and goals — we'll review your current marketing and highlight opportunities to grow.",
    messagePlaceholder: "Anything specific you'd like us to look at? (optional)",
  },
  quote: {
    heading: "Get a free quote",
    helper: "Describe your project's scope, timing and budget so we can prepare an accurate estimate.",
    messagePlaceholder: "Project scope, locations, timeline…",
  },
  contact: {
    heading: "Send us a message",
    helper: "Questions, partnerships or anything else — we'll route your message to the right person.",
    messagePlaceholder: "How can we help?",
  },
};

export const nextSteps = [
  { title: "We review your inquiry", body: "A strategist reads every submission to understand your goals, market and challenges." },
  { title: "We reach out", body: "We contact you to clarify details and find a time that works for you." },
  { title: "Your strategy session", body: "We walk you through opportunities and a recommended plan — with no obligation." },
] as const;

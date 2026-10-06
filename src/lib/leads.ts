/**
 * Lead (contact form) schema shared by the client form and POST /api/contact.
 *
 * Everything in this module is pure and framework-free so it can be unit
 * tested later and imported from both Client and Server Components.
 */
import { z } from "zod";
import { inquiryTypes, services, type InquiryType } from "@/content/site";

export const INQUIRY_TYPES = inquiryTypes.map((t) => t.value) as [InquiryType, ...InquiryType[]];
export const DEFAULT_INQUIRY_TYPE: InquiryType = "consultation";

export function isInquiryType(value: unknown): value is InquiryType {
  return typeof value === "string" && (INQUIRY_TYPES as string[]).includes(value);
}

/** Resolve a raw `?type=` search param to a known inquiry type. */
export function parseInquiryType(value: string | string[] | undefined): InquiryType {
  const v = Array.isArray(value) ? value[0] : value;
  return isInquiryType(v) ? v : DEFAULT_INQUIRY_TYPE;
}

export const NOT_SURE = "not-sure";
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug as string, label: s.name as string })),
  { value: NOT_SURE, label: "Not sure yet" },
];
const SERVICE_VALUES = serviceOptions.map((o) => o.value) as [string, ...string[]];

// TODO(content): move to src/content/site.ts once budget ranges are approved.
export const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "undecided", label: "Not sure yet" },
] as const;
const BUDGET_VALUES = budgetOptions.map((o) => o.value) as unknown as [string, ...string[]];

export const MESSAGE_MAX = 2000;
/** Submissions completed faster than this are treated as automated. */
export const MIN_FILL_MS = 3000;
/** Name of the honeypot input. Humans never see or fill it. */
export const HONEYPOT_FIELD = "company_website";

/** Types for which the message field is required. */
export const MESSAGE_REQUIRED_FOR: readonly InquiryType[] = ["contact", "quote"];

const MESSAGE_REQUIRED_ERROR = "Tell us a little about your project.";
const PHONE_RE = /^[0-9+().\-\s]{7,30}$/;

/** Accepts "example.com" or "https://example.com"; returns the normalized URL or null. */
export function normalizeWebsite(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional()
    .default("");

export const leadSchema = z
  .object({
    type: z.enum(INQUIRY_TYPES, { error: "Choose an inquiry type." }),
    name: z
      .string({ error: "Enter your name." })
      .trim()
      .min(1, "Enter your name.")
      .max(100, "Name must be 100 characters or fewer."),
    email: z
      .string({ error: "Enter your email address." })
      .trim()
      .min(1, "Enter your email address.")
      .max(254, "Email must be 254 characters or fewer.")
      .pipe(z.email("Enter a valid email address, like name@company.com.")),
    phone: optionalText(30, "Phone").refine((v) => v === "" || PHONE_RE.test(v), {
      message: "Enter a valid phone number, using digits and + ( ) - only.",
    }),
    company: optionalText(120, "Company"),
    service: z.enum(SERVICE_VALUES, { error: "Choose a service." }).optional().default(NOT_SURE),
    website: optionalText(200, "Website").refine((v) => v === "" || normalizeWebsite(v) !== null, {
      message: "Enter a valid website address, like example.com.",
    }),
    budget: z.enum(["", ...BUDGET_VALUES], { error: "Choose a budget range from the list." }).optional().default(""),
    message: optionalText(MESSAGE_MAX, "Message"),
    consent: z.literal(true, { error: "Please confirm you agree to be contacted." }),
  })
  .superRefine((data, ctx) => {
    if (MESSAGE_REQUIRED_FOR.includes(data.type) && data.message.length === 0) {
      ctx.addIssue({ code: "custom", path: ["message"], message: MESSAGE_REQUIRED_ERROR });
    }
  })
  .transform((data) => ({
    ...data,
    // Drop fields that don't belong to this journey so they are never delivered.
    website: data.type === "audit" && data.website ? (normalizeWebsite(data.website) ?? "") : "",
    budget: data.type === "quote" ? data.budget : "",
  }));

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = Exclude<keyof LeadInput, undefined>;
export type LeadFieldErrors = Partial<Record<LeadField, string>>;

/** Order used for error summaries and focusing the first invalid field. */
export const LEAD_FIELD_ORDER: LeadField[] = [
  "type",
  "name",
  "email",
  "phone",
  "company",
  "service",
  "website",
  "budget",
  "message",
  "consent",
];

/** First message per field from a zod error. */
export function toFieldErrors(error: z.ZodError): LeadFieldErrors {
  const out: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && (LEAD_FIELD_ORDER as string[]).includes(key) && !(key in out)) {
      out[key as LeadField] = issue.message;
    }
  }
  return out;
}

export type ValidationResult = { ok: true; data: Lead } | { ok: false; fieldErrors: LeadFieldErrors };

export function validateLead(input: unknown): ValidationResult {
  const result = leadSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };

  const fieldErrors = toFieldErrors(result.error);
  // zod skips the object-level refinement when any field fails, so mirror the
  // "message required" rule here to report every problem in one pass.
  const raw = (input ?? {}) as Record<string, unknown>;
  if (
    !fieldErrors.message &&
    isInquiryType(raw.type) &&
    MESSAGE_REQUIRED_FOR.includes(raw.type) &&
    (typeof raw.message !== "string" || raw.message.trim() === "")
  ) {
    fieldErrors.message = MESSAGE_REQUIRED_ERROR;
  }
  return { ok: false, fieldErrors };
}

/**
 * Bot heuristics evaluated on the raw request body before validation:
 * a filled honeypot, or a form completed faster than MIN_FILL_MS.
 * `elapsedMs` is measured on the client (time since the form mounted) so it
 * is immune to client/server clock skew.
 */
export function isLikelyBot(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;
  const body = raw as Record<string, unknown>;
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const elapsed = body.elapsedMs;
  if (typeof elapsed !== "number" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return true;
  return false;
}

/** Request body shape sent by the contact form. */
export type LeadRequestBody = LeadInput & { [HONEYPOT_FIELD]: string; elapsedMs: number };

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: "validation_failed"; fieldErrors: LeadFieldErrors }
  | {
      ok: false;
      error: "invalid_json" | "unsupported_media_type" | "payload_too_large" | "rate_limited" | "delivery_failed" | "not_configured";
    };

export const serviceLabel = (value: string) => serviceOptions.find((o) => o.value === value)?.label ?? value;
export const budgetLabel = (value: string) => budgetOptions.find((o) => o.value === value)?.label ?? value;
export const inquiryLabel = (value: InquiryType) => inquiryTypes.find((t) => t.value === value)?.label ?? value;

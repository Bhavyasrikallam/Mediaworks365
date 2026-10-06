import { describe, expect, it } from "vitest";
import {
  DEFAULT_INQUIRY_TYPE,
  HONEYPOT_FIELD,
  INQUIRY_TYPES,
  MESSAGE_MAX,
  MIN_FILL_MS,
  NOT_SURE,
  isLikelyBot,
  normalizeWebsite,
  parseInquiryType,
  validateLead,
  type LeadInput,
} from "@/lib/leads";
import type { InquiryType } from "@/content/site";

const base = (type: InquiryType, overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  type,
  name: "Ada Lovelace",
  email: "ada@example.com",
  consent: true,
  message: "We would like to grow our store traffic.",
  ...overrides,
});

function expectValid(input: unknown) {
  const result = validateLead(input);
  if (!result.ok) throw new Error(`expected valid, got ${JSON.stringify(result.fieldErrors)}`);
  return result.data;
}

function expectInvalid(input: unknown) {
  const result = validateLead(input);
  if (result.ok) throw new Error("expected validation to fail");
  return result.fieldErrors;
}

describe("validateLead", () => {
  it.each(INQUIRY_TYPES)("accepts a valid %s lead", (type) => {
    const lead = expectValid(base(type));
    expect(lead.type).toBe(type);
    expect(lead.name).toBe("Ada Lovelace");
    expect(lead.consent).toBe(true);
    expect(lead.service).toBe(NOT_SURE);
  });

  it("accepts and trims a fully populated quote lead", () => {
    const input: LeadInput = {
      type: "quote",
      name: "  Ada  ",
      email: " ada@example.com ",
      phone: "+1 (555) 010-2000",
      company: "Analytical Engines",
      service: "seo",
      budget: "5k-15k",
      message: "Quote please",
      consent: true,
    };
    expect(expectValid(input)).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      service: "seo",
      budget: "5k-15k",
    });
  });

  it.each(["name", "email", "consent"] as const)("requires %s", (field) => {
    const input = base("consultation");
    delete input[field];
    expect(expectInvalid(input)[field]).toBeTruthy();
  });

  it("rejects blank (whitespace-only) name and email", () => {
    const errors = expectInvalid(base("consultation", { name: "   ", email: "  " }));
    expect(errors.name).toBe("Enter your name.");
    expect(errors.email).toBe("Enter your email address.");
  });

  it("rejects consent other than literal true", () => {
    expect(expectInvalid(base("consultation", { consent: false })).consent).toBeTruthy();
    expect(expectInvalid(base("consultation", { consent: "true" })).consent).toBeTruthy();
  });

  it.each(["not-an-email", "a@b", "ada@", "@example.com", "ada @example.com"])("rejects invalid email %j", (email) => {
    expect(expectInvalid(base("consultation", { email })).email).toMatch(/valid email/);
  });

  it("rejects unknown inquiry types and services", () => {
    const errors = expectInvalid(base("consultation", { type: "spam", service: "nope" }));
    expect(errors.type).toBeTruthy();
    expect(errors.service).toBeTruthy();
  });

  it("rejects invalid phone numbers", () => {
    expect(expectInvalid(base("consultation", { phone: "call me" })).phone).toBeTruthy();
  });

  describe("message", () => {
    it.each(["contact", "quote"] as const)("is required for %s", (type) => {
      expect(expectInvalid(base(type, { message: "" })).message).toBeTruthy();
      expect(expectInvalid(base(type, { message: "   " })).message).toBeTruthy();
      expect(expectInvalid(base(type, { message: undefined })).message).toBeTruthy();
    });

    it.each(["consultation", "audit"] as const)("is optional for %s", (type) => {
      expect(expectValid(base(type, { message: undefined })).message).toBe("");
    });

    it("is reported alongside other field errors in a single pass", () => {
      const errors = expectInvalid(base("quote", { message: "", email: "bad" }));
      expect(errors.email).toBeTruthy();
      expect(errors.message).toBeTruthy();
    });

    it(`allows exactly ${MESSAGE_MAX} characters and rejects more`, () => {
      expectValid(base("contact", { message: "x".repeat(MESSAGE_MAX) }));
      const errors = expectInvalid(base("contact", { message: "x".repeat(MESSAGE_MAX + 1) }));
      expect(errors.message).toContain(String(MESSAGE_MAX));
    });
  });

  describe("journey-specific fields", () => {
    it("keeps and normalizes website only for audit", () => {
      expect(expectValid(base("audit", { website: "example.com" })).website).toBe("https://example.com/");
      for (const type of ["consultation", "quote", "contact"] as const) {
        expect(expectValid(base(type, { website: "example.com" })).website).toBe("");
      }
    });

    it("keeps budget only for quote", () => {
      expect(expectValid(base("quote", { budget: "50k-plus" })).budget).toBe("50k-plus");
      for (const type of ["consultation", "audit", "contact"] as const) {
        expect(expectValid(base(type, { budget: "50k-plus" })).budget).toBe("");
      }
    });

    it("rejects an invalid website and an unknown budget", () => {
      expect(expectInvalid(base("audit", { website: "not a url" })).website).toBeTruthy();
      expect(expectInvalid(base("quote", { budget: "a-million" })).budget).toBeTruthy();
    });
  });

  it("handles non-object input without throwing", () => {
    expect(validateLead(null).ok).toBe(false);
    expect(validateLead("hello").ok).toBe(false);
    expect(validateLead(undefined).ok).toBe(false);
  });
});

describe("normalizeWebsite", () => {
  it.each([
    ["example.com", "https://example.com/"],
    ["http://example.com/path", "http://example.com/path"],
    ["  https://sub.example.co.uk  ", "https://sub.example.co.uk/"],
  ])("normalizes %j", (raw, expected) => {
    expect(normalizeWebsite(raw)).toBe(expected);
  });

  it.each(["", "   ", "localhost", "javascript://example.com", "ftp://example.com", "not a url"])("rejects %j", (raw) => {
    expect(normalizeWebsite(raw)).toBeNull();
  });
});

describe("parseInquiryType", () => {
  it("returns known types unchanged", () => {
    for (const type of INQUIRY_TYPES) expect(parseInquiryType(type)).toBe(type);
  });

  it("defaults missing or unknown values", () => {
    expect(DEFAULT_INQUIRY_TYPE).toBe("consultation");
    expect(parseInquiryType(undefined)).toBe(DEFAULT_INQUIRY_TYPE);
    expect(parseInquiryType("")).toBe(DEFAULT_INQUIRY_TYPE);
    expect(parseInquiryType("AUDIT")).toBe(DEFAULT_INQUIRY_TYPE);
    expect(parseInquiryType("<script>")).toBe(DEFAULT_INQUIRY_TYPE);
  });

  it("uses the first value of an array", () => {
    expect(parseInquiryType(["quote", "audit"])).toBe("quote");
    expect(parseInquiryType(["bogus", "audit"])).toBe(DEFAULT_INQUIRY_TYPE);
    expect(parseInquiryType([])).toBe(DEFAULT_INQUIRY_TYPE);
  });
});

describe("isLikelyBot", () => {
  const human = { [HONEYPOT_FIELD]: "", elapsedMs: MIN_FILL_MS + 1000 };

  it("passes a human submission", () => {
    expect(isLikelyBot(human)).toBe(false);
    expect(isLikelyBot({ ...human, elapsedMs: MIN_FILL_MS })).toBe(false);
  });

  it("flags a filled honeypot", () => {
    expect(isLikelyBot({ ...human, [HONEYPOT_FIELD]: "https://spam.example" })).toBe(true);
  });

  it("ignores a whitespace-only honeypot", () => {
    expect(isLikelyBot({ ...human, [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("flags too-fast, missing or non-numeric elapsed time", () => {
    expect(isLikelyBot({ ...human, elapsedMs: MIN_FILL_MS - 1 })).toBe(true);
    expect(isLikelyBot({ ...human, elapsedMs: 0 })).toBe(true);
    expect(isLikelyBot({ [HONEYPOT_FIELD]: "" })).toBe(true);
    expect(isLikelyBot({ ...human, elapsedMs: "5000" })).toBe(true);
    expect(isLikelyBot({ ...human, elapsedMs: Number.NaN })).toBe(true);
    expect(isLikelyBot({ ...human, elapsedMs: Number.POSITIVE_INFINITY })).toBe(true);
  });

  it("does not flag non-object bodies (validation rejects them instead)", () => {
    expect(isLikelyBot(null)).toBe(false);
    expect(isLikelyBot("text")).toBe(false);
  });
});

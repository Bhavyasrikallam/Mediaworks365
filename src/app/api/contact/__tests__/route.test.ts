import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HONEYPOT_FIELD, MIN_FILL_MS } from "@/lib/leads";

type PostHandler = (request: Request) => Promise<Response>;

const URL_ = "http://localhost/api/contact";

let ipCounter = 0;
/** A fresh client IP per request so the module-level rate limiter never bleeds across tests. */
const nextIp = () => `198.51.100.${++ipCounter}`;

const validBody = (overrides: Record<string, unknown> = {}) => ({
  type: "quote",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "",
  company: "Analytical Engines",
  service: "seo",
  website: "",
  budget: "5k-15k",
  message: "Please send a quote.",
  consent: true,
  [HONEYPOT_FIELD]: "",
  elapsedMs: MIN_FILL_MS + 2000,
  ...overrides,
});

function makeRequest(
  body: unknown,
  { ip = nextIp(), contentType = "application/json", raw }: { ip?: string; contentType?: string; raw?: string } = {},
) {
  return new Request(URL_, {
    method: "POST",
    headers: { "content-type": contentType, "x-forwarded-for": ip },
    body: raw ?? JSON.stringify(body),
  });
}

let POST: PostHandler;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(async () => {
  // Fresh module per test: resets the in-memory rate limiter.
  vi.resetModules();
  ({ POST } = await import("@/app/api/contact/route"));

  fetchMock = vi.fn(async () => Response.json({ id: "email_123" }, { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("CONTACT_TO_EMAIL", "");
  vi.stubEnv("CONTACT_FROM_EMAIL", "");
  vi.stubEnv("NODE_ENV", "test");

  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function configureResend() {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_TO_EMAIL", "leads@example.com, sales@example.com");
}

describe("POST /api/contact", () => {
  it("returns 415 for a non-JSON content type", async () => {
    const res = await POST(makeRequest(null, { contentType: "text/plain", raw: "hello" }));
    expect(res.status).toBe(415);
    expect(await res.json()).toEqual({ ok: false, error: "unsupported_media_type" });
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it("accepts a JSON content type with a charset parameter", async () => {
    const res = await POST(makeRequest(validBody(), { contentType: "application/json; charset=utf-8" }));
    expect(res.status).toBe(200);
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(makeRequest(null, { raw: "{not json" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_json" });
  });

  it("returns 413 for an oversized body", async () => {
    const res = await POST(makeRequest(validBody({ message: "x".repeat(20 * 1024) })));
    expect(res.status).toBe(413);
    expect(await res.json()).toEqual({ ok: false, error: "payload_too_large" });
  });

  it("returns 400 with fieldErrors when validation fails", async () => {
    const res = await POST(makeRequest(validBody({ email: "nope", message: "", consent: false })));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toBe("validation_failed");
    expect(Object.keys(json.fieldErrors).sort()).toEqual(["consent", "email", "message"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 200 for a honeypot submission without delivering", async () => {
    configureResend();
    const res = await POST(makeRequest(validBody({ [HONEYPOT_FIELD]: "http://spam.example" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 200 for a too-fast submission without delivering", async () => {
    configureResend();
    const res = await POST(makeRequest(validBody({ elapsedMs: 200 })));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 200 in development when delivery is not configured, logging no PII", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    const logged = JSON.stringify(vi.mocked(console.info).mock.calls);
    expect(logged).not.toContain("ada@example.com");
    expect(logged).not.toContain("Ada Lovelace");
  });

  it("returns 503 in production when delivery is not configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("delivers via Resend when configured and returns 200", async () => {
    vi.stubEnv("NODE_ENV", "production");
    configureResend();
    const res = await POST(makeRequest(validBody({ website: "example.com" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")).toBe("Bearer re_test_key");
    expect(headers.get("Content-Type")).toBe("application/json");

    const payload = JSON.parse(String(init.body));
    expect(payload.to).toEqual(["leads@example.com", "sales@example.com"]);
    expect(payload.reply_to).toBe("ada@example.com");
    expect(payload.from).toBe("Mediaworks 365 <onboarding@resend.dev>");
    expect(payload.subject).toBe("[quote] New inquiry from Ada Lovelace");
    expect(payload.text).toContain("Budget range: $5,000 – $15,000");
    expect(payload.text).toContain("Service interest: Search Engine Optimization");
    // Website belongs to the audit journey only, so it is dropped for a quote.
    expect(payload.text).not.toContain("Website:");
  });

  it("uses CONTACT_FROM_EMAIL and strips header-injection characters from the subject", async () => {
    configureResend();
    vi.stubEnv("CONTACT_FROM_EMAIL", "Leads <leads@mediaworks.example>");
    const res = await POST(makeRequest(validBody({ name: "Ada\r\nBcc: victim@example.com" })));
    expect(res.status).toBe(200);
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(payload.from).toBe("Leads <leads@mediaworks.example>");
    expect(payload.subject).not.toMatch(/[\r\n]/);
  });

  it("returns 502 when Resend responds with an error", async () => {
    configureResend();
    fetchMock.mockResolvedValueOnce(Response.json({ message: "bad key" }, { status: 401 }));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "delivery_failed" });
  });

  it("returns 502 when the Resend request throws", async () => {
    configureResend();
    fetchMock.mockRejectedValueOnce(new TypeError("network down"));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(502);
  });

  it("returns 429 with Retry-After after exceeding the per-IP limit", async () => {
    const ip = "203.0.113.50";
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validBody(), { ip }));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(makeRequest(validBody(), { ip }));
    expect(blocked.status).toBe(429);
    expect(await blocked.json()).toEqual({ ok: false, error: "rate_limited" });
    const retryAfter = Number(blocked.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(600);

    // A different client is unaffected.
    expect((await POST(makeRequest(validBody()))).status).toBe(200);
  });
});

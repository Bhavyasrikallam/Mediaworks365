import {
  budgetLabel,
  inquiryLabel,
  isLikelyBot,
  serviceLabel,
  validateLead,
  type Lead,
  type LeadResponse,
} from "@/lib/leads";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10 * 1024;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Mediaworks 365 <onboarding@resend.dev>";

// 5 submissions per 10 minutes per IP (per server instance — see rate-limit.ts).
const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function reply(body: LeadResponse, status: number, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Read the request body as text, aborting once it exceeds `limit` bytes. */
async function readLimited(request: Request, limit: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/** Collapse CR/LF and other control characters so values are safe in headers / subjects. */
function oneLine(value: string, max = 200) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

function emailText(lead: Lead) {
  const rows: [string, string][] = [
    ["Inquiry type", inquiryLabel(lead.type)],
    ["Name", oneLine(lead.name)],
    ["Email", oneLine(lead.email)],
    ["Phone", oneLine(lead.phone)],
    ["Company", oneLine(lead.company)],
    ["Service interest", serviceLabel(lead.service)],
    ["Website", oneLine(lead.website)],
    ["Budget range", lead.budget ? budgetLabel(lead.budget) : ""],
  ];
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  return [
    ...lines,
    "",
    "Message:",
    lead.message || "(none)",
    "",
    "Consent to be contacted: yes",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

async function deliverViaResend(lead: Lead, apiKey: string, to: string): Promise<boolean> {
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: oneLine(lead.email, 254),
        subject: oneLine(`[${lead.type}] New inquiry from ${oneLine(lead.name, 100)}`),
        text: emailText(lead),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      // Log status only — the provider's error body may echo lead data.
      console.error("[contact] Resend delivery failed", { status: res.status, type: lead.type });
      return false;
    }
    return true;
  } catch (err) {
    const reason = err instanceof Error ? err.name : "unknown";
    console.error("[contact] Resend delivery error", { reason, type: lead.type });
    return false;
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return reply({ ok: false, error: "unsupported_media_type" }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "payload_too_large" }, 413);
  }

  const limited = rateLimit(getClientIp(request.headers));
  if (!limited.ok) {
    return reply({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(limited.retryAfterSeconds) });
  }

  const text = await readLimited(request, MAX_BODY_BYTES);
  if (text === null) return reply({ ok: false, error: "payload_too_large" }, 413);

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return reply({ ok: false, error: "invalid_json" }, 400);
  }

  // Bots get a normal-looking success so they don't learn to adapt.
  if (isLikelyBot(raw)) return reply({ ok: true }, 200);

  const result = validateLead(raw);
  if (!result.ok) {
    return reply({ ok: false, error: "validation_failed", fieldErrors: result.fieldErrors }, 400);
  }
  const lead = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const delivered = await deliverViaResend(lead, apiKey, to);
    return delivered ? reply({ ok: true }, 200) : reply({ ok: false, error: "delivery_failed" }, 502);
  }

  if (process.env.NODE_ENV !== "production") {
    // Redacted: no name, email, phone, company, website or message content.
    console.info("[contact] Lead received (delivery not configured — dev only)", {
      type: lead.type,
      service: lead.service,
      budget: lead.budget || undefined,
      hasPhone: Boolean(lead.phone),
      hasCompany: Boolean(lead.company),
      hasWebsite: Boolean(lead.website),
      messageLength: lead.message.length,
    });
    return reply({ ok: true }, 200);
  }

  console.error("[contact] Lead delivery is not configured (set RESEND_API_KEY and CONTACT_TO_EMAIL).");
  return reply({ ok: false, error: "not_configured" }, 503);
}

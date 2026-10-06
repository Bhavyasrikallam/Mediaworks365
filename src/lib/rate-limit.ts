/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * NOTE: state lives in the memory of a single server process. Serverless or
 * multi-instance deployments each get their own counters (and lose them on
 * cold start), so production at scale should swap this for a shared store
 * such as Redis / Upstash / a KV database with the same interface.
 */

type Hits = number[];

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterSeconds: number };

export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const store = new Map<string, Hits>();

  function prune(now: number) {
    for (const [key, hits] of store) {
      if (hits.length === 0 || now - hits[hits.length - 1] >= windowMs) store.delete(key);
    }
  }

  return function check(key: string, now = Date.now()): RateLimitResult {
    if (store.size > maxKeys) prune(now);

    const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);
    if (hits.length >= limit) {
      store.set(key, hits);
      const retryAfterMs = windowMs - (now - hits[0]);
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
    }
    hits.push(now);
    store.set(key, hits);
    return { ok: true, remaining: limit - hits.length };
  };
}

/**
 * Best-effort client IP. `x-forwarded-for` / `x-real-ip` are only trustworthy
 * when set by your own proxy or hosting platform (e.g. Vercel); otherwise a
 * client can spoof them, so treat this as abuse throttling, not security.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

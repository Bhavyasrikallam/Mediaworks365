import { afterEach, describe, expect, it, vi } from "vitest";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

const WINDOW = 60_000;

describe("createRateLimiter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to the limit, then blocks with a retry-after", () => {
    const check = createRateLimiter({ limit: 3, windowMs: WINDOW });
    const t0 = 1_000_000;
    expect(check("a", t0)).toEqual({ ok: true, remaining: 2 });
    expect(check("a", t0 + 1000)).toEqual({ ok: true, remaining: 1 });
    expect(check("a", t0 + 2000)).toEqual({ ok: true, remaining: 0 });
    // Oldest hit (t0) expires at t0 + 60s, i.e. 50s from now.
    expect(check("a", t0 + 10_000)).toEqual({ ok: false, retryAfterSeconds: 50 });
  });

  it("rounds retry-after up and never returns less than 1 second", () => {
    const check = createRateLimiter({ limit: 1, windowMs: WINDOW });
    check("a", 0);
    expect(check("a", 1)).toEqual({ ok: false, retryAfterSeconds: 60 });
    expect(check("a", WINDOW - 1)).toEqual({ ok: false, retryAfterSeconds: 1 });
  });

  it("does not count blocked attempts against the window", () => {
    const check = createRateLimiter({ limit: 1, windowMs: WINDOW });
    check("a", 0);
    for (let i = 1; i < 10; i++) expect(check("a", i * 1000).ok).toBe(false);
    expect(check("a", WINDOW).ok).toBe(true);
  });

  it("slides the window: hits expire individually", () => {
    const check = createRateLimiter({ limit: 2, windowMs: WINDOW });
    check("a", 0);
    check("a", 30_000);
    expect(check("a", 59_999).ok).toBe(false);
    expect(check("a", 60_000)).toEqual({ ok: true, remaining: 0 }); // first hit expired
    expect(check("a", 70_000).ok).toBe(false); // 30s hit still live
    expect(check("a", 90_000).ok).toBe(true);
  });

  it("uses Date.now() by default (fake timers)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const check = createRateLimiter({ limit: 1, windowMs: WINDOW });
    expect(check("a").ok).toBe(true);
    expect(check("a")).toEqual({ ok: false, retryAfterSeconds: 60 });
    vi.advanceTimersByTime(WINDOW);
    expect(check("a").ok).toBe(true);
  });

  it("tracks keys independently", () => {
    const check = createRateLimiter({ limit: 1, windowMs: WINDOW });
    expect(check("a", 0).ok).toBe(true);
    expect(check("a", 1).ok).toBe(false);
    expect(check("b", 2).ok).toBe(true);
    expect(check("c", 3).ok).toBe(true);
    expect(check("b", 4).ok).toBe(false);
  });

  it("separate limiter instances do not share state", () => {
    const one = createRateLimiter({ limit: 1, windowMs: WINDOW });
    const two = createRateLimiter({ limit: 1, windowMs: WINDOW });
    one("a", 0);
    expect(two("a", 0).ok).toBe(true);
  });

  it("prunes expired keys once maxKeys is exceeded without losing live counters", () => {
    const check = createRateLimiter({ limit: 1, windowMs: WINDOW, maxKeys: 2 });
    check("old1", 0);
    check("old2", 0);
    check("live", WINDOW - 1);
    // Store now holds 3 keys > maxKeys, so this call prunes the expired ones.
    expect(check("new", WINDOW).ok).toBe(true);
    expect(check("live", WINDOW + 1).ok).toBe(false);
    expect(check("old1", WINDOW + 2).ok).toBe(true);
  });
});

describe("getClientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe("203.0.113.7");
    expect(getClientIp(new Headers({ "x-forwarded-for": "  198.51.100.2  " }))).toBe("198.51.100.2");
  });

  it("prefers x-forwarded-for over x-real-ip", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7", "x-real-ip": "198.51.100.9" });
    expect(getClientIp(headers)).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip when x-forwarded-for is missing or its first entry is empty", () => {
    expect(getClientIp(new Headers({ "x-real-ip": " 198.51.100.9 " }))).toBe("198.51.100.9");
    expect(getClientIp(new Headers({ "x-forwarded-for": " , 10.0.0.1", "x-real-ip": "198.51.100.9" }))).toBe(
      "198.51.100.9",
    );
  });

  it("returns 'unknown' when no IP headers are present", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

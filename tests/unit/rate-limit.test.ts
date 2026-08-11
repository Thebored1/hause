import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { hit, clientIp, reset } from "@/lib/rate-limit";

/**
 * The limiter guards the public enquiry endpoint, so the boundary matters:
 * off by one either way is a form that rejects a real visitor, or one that
 * lets a script through.
 *
 * Time is faked rather than slept on - a real ten-minute window would make
 * this suite useless.
 */
describe("rate limiting", () => {
  beforeEach(() => {
    reset();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows exactly `limit` requests, then refuses", () => {
    for (let i = 1; i <= 5; i++) {
      expect(hit("ip", 5, 60_000).ok, `request ${i}`).toBe(true);
    }
    expect(hit("ip", 5, 60_000).ok).toBe(false);
  });

  it("counts down remaining", () => {
    expect(hit("ip", 3, 60_000).remaining).toBe(2);
    expect(hit("ip", 3, 60_000).remaining).toBe(1);
    expect(hit("ip", 3, 60_000).remaining).toBe(0);
    // Never negative, however far over the limit it goes.
    expect(hit("ip", 3, 60_000).remaining).toBe(0);
  });

  it("keeps separate counters per key", () => {
    for (let i = 0; i < 5; i++) hit("a", 5, 60_000);
    expect(hit("a", 5, 60_000).ok).toBe(false);
    // One visitor hitting the limit must not lock out everyone else.
    expect(hit("b", 5, 60_000).ok).toBe(true);
  });

  it("lets the caller back in once the window passes", () => {
    for (let i = 0; i < 5; i++) hit("ip", 5, 60_000);
    expect(hit("ip", 5, 60_000).ok).toBe(false);

    vi.advanceTimersByTime(60_001);
    expect(hit("ip", 5, 60_000).ok).toBe(true);
  });

  it("still refuses one millisecond before the window closes", () => {
    for (let i = 0; i < 5; i++) hit("ip", 5, 60_000);
    vi.advanceTimersByTime(59_999);
    expect(hit("ip", 5, 60_000).ok).toBe(false);
  });

  it("reports a retryAfter that is usable in a message", () => {
    for (let i = 0; i < 6; i++) hit("ip", 5, 60_000);
    vi.advanceTimersByTime(30_000);
    const { ok, retryAfter } = hit("ip", 5, 60_000);
    expect(ok).toBe(false);
    // Rounded up and never zero - "try again in 0 seconds" would be nonsense.
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(30);
  });
});

describe("clientIp", () => {
  const headers = (init: Record<string, string>) => new Headers(init);

  it("prefers x-forwarded-for", () => {
    expect(clientIp(headers({ "x-forwarded-for": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("takes the first address of a proxy chain", () => {
    expect(
      clientIp(headers({ "x-forwarded-for": "203.0.113.9, 70.41.3.18, 150.172.238.178" })),
    ).toBe("203.0.113.9");
  });

  it("trims whitespace", () => {
    expect(clientIp(headers({ "x-forwarded-for": "  203.0.113.9  , 70.41.3.18" }))).toBe(
      "203.0.113.9",
    );
  });

  it("falls back to x-real-ip", () => {
    expect(clientIp(headers({ "x-real-ip": "198.51.100.7" }))).toBe("198.51.100.7");
  });

  it("returns 'unknown' when no header is present", () => {
    // Everyone collapses into one bucket here - documented, and worth pinning
    // so the fallback is never quietly changed to something that throws.
    expect(clientIp(headers({}))).toBe("unknown");
  });

  it("returns 'unknown' when headers are missing entirely", () => {
    expect(clientIp(undefined)).toBe("unknown");
  });
});

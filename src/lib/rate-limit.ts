/**
 * A fixed-window rate limiter held in process memory.
 *
 * Scope, so nobody mistakes this for more than it is: the counters live in the
 * memory of one server process. They reset on deploy, and on a platform that
 * runs several instances each one keeps its own tally, so the effective limit
 * is roughly `limit × instances`. That is fine for holding back a script
 * hammering a contact form, and is not a defence against a distributed flood.
 * If you need a real one, move the counter to Redis/Upstash — `hit()` is the
 * only function that would change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so a long-lived process does not grow without bound. */
function prune(now: number): void {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets. */
  retryAfter: number;
  remaining: number;
}

export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  prune(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: limit - 1 };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    ok: existing.count <= limit,
    retryAfter,
    remaining: Math.max(0, limit - existing.count),
  };
}

/** Test seam — the buckets are module state and would otherwise leak between cases. */
export function reset(): void {
  buckets.clear();
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is client-controlled unless a proxy overwrites it, so this
 * is a speed bump for casual abuse rather than an identity. Vercel and most
 * reverse proxies do overwrite it.
 *
 * If you deploy somewhere that sets neither header, every visitor collapses
 * into the single "unknown" bucket and real users start getting 429s once the
 * limit is reached between them. Check your platform forwards one of these
 * before relying on this.
 */
export function clientIp(headers: Headers | undefined): string {
  if (!headers) return "unknown";
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

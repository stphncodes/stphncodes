/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Deliberately dependency-free. The trade-off: state lives in the module scope
 * of a single serverless instance, so limits are **per-instance** and reset on
 * every redeploy or cold start. That's fine as a cheap abuse brake on a
 * portfolio site — it stops a single browser tab or naive script from hammering
 * the endpoint. It is NOT a hard guarantee.
 *
 * If traffic ever justifies it, swap the body of `rateLimit()` for a durable
 * store (Upstash Redis, Vercel KV) — the signature is designed to stay the same.
 */

interface Window {
  /** Requests seen in the current window. */
  count: number;
  /** Epoch ms when the current window expires. */
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Drop expired entries so the Map can't grow without bound. */
function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets — sent as `Retry-After` when blocked. */
  retryAfter: number;
}

/**
 * @param key       Bucket identifier (here: the caller's IP).
 * @param limit     Max requests allowed per window.
 * @param windowMs  Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Cheap opportunistic cleanup; the map only holds active IPs.
  if (windows.size > 500) sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { ok: true, retryAfter: 0 };
}

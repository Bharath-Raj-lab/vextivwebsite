// ⚠️ SERVER ONLY — never import in client components.
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Upstash rate limiter — singleton.
 *
 * Sliding window: 5 requests per 60-minute window, keyed by client IP.
 * Used by /api/contact (and future /api/audit) to throttle abuse.
 *
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in env.
 */
export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'vextiv:ratelimit',
});

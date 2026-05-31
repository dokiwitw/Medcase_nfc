import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
});

export async function rateLimit(ip: string, limit = 20, windowSeconds = 60) {
  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  const remaining = Math.max(0, limit - count);
  const resetAt = Date.now() + windowSeconds * 1000;

  return {
    success: count <= limit,
    remaining,
    resetAt,
    total: limit,
  };
}

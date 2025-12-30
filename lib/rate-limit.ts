import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;
  private rateLimitExceededCount = 0;

  constructor(
    private limit = 20,
    private windowMs = 60000,
    private cleanupIntervalMs = 30000
  ) {
    this.cleanupInterval = setInterval(() => this.cleanup(), this.cleanupIntervalMs);
    
    if (typeof process !== 'undefined') {
      process.on('SIGTERM', () => this.destroy());
      process.on('SIGINT', () => this.destroy());
    }
  }

  check(key: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      const resetTime = now + this.windowMs;
      this.store.set(key, { 
        count: 1, 
        firstRequest: now,
        resetTime 
      });
      return { allowed: true, remaining: this.limit - 1, resetTime };
    }

    if (now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.store.set(key, { 
        count: 1, 
        firstRequest: now,
        resetTime 
      });
      return { allowed: true, remaining: this.limit - 1, resetTime };
    }

    if (entry.count >= this.limit) {
      this.rateLimitExceededCount++;
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: entry.resetTime 
      };
    }

    entry.count++;
    return { 
      allowed: true, 
      remaining: this.limit - entry.count, 
      resetTime: entry.resetTime 
    };
  }

  private cleanup() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime + 60000) {
        this.store.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`[RateLimit] Cleaned ${cleaned} expired entries`);
    }
  }

  getStats() {
    return {
      totalKeys: this.store.size,
      rateLimitExceeded: this.rateLimitExceededCount,
      windowMs: this.windowMs,
      limit: this.limit
    };
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

export const rateLimiters = {
  propertyCreation: new RateLimiter(10, 60000),
  generalAPI: new RateLimiter(100, 60000),
  auth: new RateLimiter(5, 300000)
};

export function getClientKey(req: NextRequest, userId?: string): string {
  if (userId) return `user:${userId}`;
  
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
  return `ip:${ip}`;
}

export function rateLimit(
  req: NextRequest, 
  type: keyof typeof rateLimiters = 'generalAPI',
  userId?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const key = getClientKey(req, userId);
  return rateLimiters[type].check(key);
}

export function getRateLimitStats() {
  return Object.entries(rateLimiters).reduce((acc, [key, limiter]) => {
    acc[key] = limiter.getStats();
    return acc;
  }, {} as Record<string, any>);
}

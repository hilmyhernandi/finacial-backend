import { redisClient } from "../../lib/redis.js";
import { rateLimitConfig } from "../../config/rate-limit.config.js";
import { rateLimitKeys } from "./rate-limit.keys.js";
import type { IRedisMessage } from "../../interfaces/messages/redis/redis-messages.interfaces.interfaces.js";
import { errorResponse } from "../../utils/error/error.js";

class RateLimiter {
  private readonly windowMs = rateLimitConfig.windowMs;
  private readonly maxRequests = rateLimitConfig.maxRequests;
  private readonly message: IRedisMessage = rateLimitConfig.message;

  public async consume(ip: string): Promise<number> {
    const key = rateLimitKeys.byIP(ip);

    const current = await redisClient.incr(key);

    if (current === 1) {
      await redisClient.pExpire(key, this.windowMs);
    }

    if (current > this.maxRequests) {
      throw new errorResponse(this.message.message, this.message.statusCode);
    }

    return this.maxRequests - current;
  }
}

export const rateLimiter = new RateLimiter();

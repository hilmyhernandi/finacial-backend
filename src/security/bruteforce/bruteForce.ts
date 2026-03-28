import { redisClient } from "../../lib/redis.js";
import { bruteForceConfig } from "../../config/bruteForce.config.js";
import { bruteForceKeys } from "./bruteForce.keys.js";
import { errorResponse } from "../../utils/error/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.constants.js";

class BruteForceProtector {
  public async check(email: string): Promise<void> {
    const key = bruteForceKeys.byEmail(email);
    const attempts = Number(await redisClient.get(key)) || 0;

    if (attempts >= bruteForceConfig.maxAttempts) {
      throw new errorResponse(
        `${bruteForceConfig.message.message}`,
        HTTP_STATUS.TOO_MANY_REQUESTS,
      );
    }
  }

  public async trackFailure(email: string): Promise<void> {
    const key = bruteForceKeys.byEmail(email);
    const attempts = await redisClient.incr(key);

    if (attempts === 1) {
      await redisClient.pExpire(key, bruteForceConfig.windowMs);
    }
  }

  public async reset(email: string): Promise<void> {
    await redisClient.del(bruteForceKeys.byEmail(email));
  }
}

export const bruteForceProtector = new BruteForceProtector();

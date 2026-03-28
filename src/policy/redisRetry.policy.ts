import { REDIS } from "../constants/redis.constants.js";
import { loggerRedis } from "../config/logger.config.js";
import { ERROR_MESSAGE } from "../constants/index.js";
/**
 * Redis Retry Policy
 * Decision maker (boleh retry atau stop)
 */
export const redisRetryPolicy = (times: number): number | false => {
  if (times > REDIS.RETRY.MAX_RETRIES) {
    loggerRedis.error(`${ERROR_MESSAGE.REDIS.RETRY_LIMIT_REACHED}`);
    return false;
  }

  return Math.min(times * REDIS.RETRY.BASE_DELAY, REDIS.RETRY.MAX_DELAY);
};

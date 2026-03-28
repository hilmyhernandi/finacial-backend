import { IRedisMessage } from "../interfaces/messages/redis/redis-messages.interfaces.interfaces.js";
import { SECURITY } from "../constants/security.constants.js";
import { HTTP_STATUS } from "../constants/httpStatus.constants.js";

export const bruteForceConfig = {
  windowMs: SECURITY.BRUTE_FORCE.WINDOW_MS,
  maxAttempts: SECURITY.BRUTE_FORCE.MAX_ATTEMPTS,
  message: {
    success: false,
    statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message: SECURITY.BRUTE_FORCE.MESSAGE,
  } satisfies IRedisMessage,
  prefix: SECURITY.BRUTE_FORCE.PREFIX,
} as const;

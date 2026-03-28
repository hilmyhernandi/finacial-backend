import { IRedisMessage } from "../interfaces/messages/redis/redis-messages.interfaces.interfaces.js";
import { HTTP_STATUS } from "../constants/httpStatus.constants.js";
import { SECURITY } from "../constants/security.constants.js";

export const rateLimitConfig = {
  windowMs: SECURITY.RATE_LIMIT.WINDOW_MS,
  maxRequests: SECURITY.RATE_LIMIT.MAX_REQUESTS,
  prefix: SECURITY.RATE_LIMIT.PREFIX,
  message: {
    success: false,
    statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message: SECURITY.RATE_LIMIT.MESSAGE,
  } satisfies IRedisMessage,
};

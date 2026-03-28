import { Request, Response, NextFunction } from "express";
import { rateLimiter } from "../security/rate-limit/rate-limit.js";
import { rateLimitPolicy } from "../policy/rate-limit.policy.js";
import { getRequestIP } from "../security/http/request-ip.js";

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!rateLimitPolicy.enabled) return next();
    if (!rateLimitPolicy.shouldApply(req)) return next();

    const ip = getRequestIP(req);
    if (!ip) return next();

    const remaining = await rateLimiter.consume(ip);

    // Optional: expose header
    res.setHeader("X-RateLimit-Remaining", remaining);

    next();
  } catch (error) {
    next(error);
  }
};

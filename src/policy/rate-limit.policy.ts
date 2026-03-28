import { Request } from "express";

export const rateLimitPolicy = {
  enabled: true,

  shouldApply(req: Request): boolean {
    if (req.method === "GET") return false;
    if (req.path.startsWith("/health")) return false;
    return true;
  },
};

import { SECURITY } from "../../constants/security.constants.js";

export const rateLimitKeys = {
  byIP(ip: string): string {
    return `${SECURITY.RATE_LIMIT.PREFIX}:${ip}`;
  },
} as const;

import { bruteForceConfig } from "../../config/bruteForce.config.js";

/**
 * Redis keys for brute-force protection
 * Domain: authentication security
 */
export const bruteForceKeys = {
  byEmail(email: string): string {
    // normalize to avoid key duplication
    const normalized = email.trim().toLowerCase();
    return `${bruteForceConfig.prefix}:${normalized}`;
  },
} as const;

import { Request } from "express";

/**
 * Resolve client IP in a security-safe way.
 * - Relies on Express trust proxy
 * - Avoids manual header parsing (spoof-safe)
 */
export function getRequestIP(req: Request): string | null {
  if (!req.ip) {
    return null;
  }

  return req.ip;
}

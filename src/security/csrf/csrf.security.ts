import { doubleCsrf } from "csrf-csrf";
import type { Request } from "express";
import { csrfConfig } from "../../config/csrf.config.js";

const { generateCsrfToken, doubleCsrfProtection, invalidCsrfTokenError } =
  doubleCsrf({
    getSecret: () => csrfConfig.secret,

    getSessionIdentifier: (req: Request): string => {
      return req.ip ?? "anonymous";
    },

    cookieName: csrfConfig.cookieName,
    cookieOptions: csrfConfig.cookieOptions,

    getCsrfTokenFromRequest: (req: Request): string | undefined => {
      const token = req.headers[csrfConfig.headerName];
      return typeof token === "string" ? token : undefined;
    },

    ignoredMethods: csrfConfig.ignoredMethods,
  });

export const csrfSecurity = {
  generateToken: generateCsrfToken,
  protection: doubleCsrfProtection,
  invalidTokenError: invalidCsrfTokenError,
} as const;

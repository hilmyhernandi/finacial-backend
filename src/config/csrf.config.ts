import { ENV } from "./environment.config.js";
import { SECURITY } from "../constants/security.constants.js";
import type { CsrfRequestMethod } from "csrf-csrf";

export const csrfConfig = {
  secret: ENV.security.csrfSecret,

  cookieName: SECURITY.CSRF.COOKIE_NAME,
  headerName: SECURITY.CSRF.HEADER_NAME,

  cookieOptions: {
    httpOnly: true,
    secure: ENV.web.isProd,
    sameSite: "lax" as const,
    path: "/",
  },

  ignoredMethods: ["GET", "HEAD", "OPTIONS"] as CsrfRequestMethod[],
};

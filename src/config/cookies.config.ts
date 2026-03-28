import { CookieOptions } from "express";
import { ENV } from "./environment.config.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: ENV.web.isProd,
  sameSite: ENV.web.isProd ? "strict" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

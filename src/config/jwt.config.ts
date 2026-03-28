import { ENV } from "./environment.config.js";
import { JWT_CONSTANTS } from "../constants/jwt.constants.js";

export const jwtConfig = {
  access: {
    secret: ENV.security.accessTokenSecret as string,
    expiresIn: "7d",
    cookieName: JWT_CONSTANTS.ACCESS_TOKEN,
  },
  refresh: {
    secret: ENV.security.refreshTokenSecret as string,
    expiresIn: "30d",
    cookieName: JWT_CONSTANTS.REFRESH_TOKEN,
  },
  cookie: {
    httpOnly: true,
    secure: ENV.web.isProd,
    sameSite: "lax" as const,
    path: "/",
  },
  signing: {
    algorithm: "HS256" as const,
    issuer: "financial-api",
    audience: "financial-client",
  },
} as const;

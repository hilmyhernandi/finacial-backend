import type { JwtPayload } from "./jwt.types.js";

export {};

declare global {
  namespace Express {
    interface UserPayload {
      userId?: string;
      email?: string;
      jti?: string;
      mode?: string;
    }

    interface Request {
      user?: UserPayload | JwtPayload;
      refreshToken?: string;
      csrfToken?: () => string;
    }
  }
}

import jwt from "jsonwebtoken";
import type { JwtPayload } from "../../types/jwt.types.js";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    return decoded as JwtPayload;
  } catch {
    return null;
  }
};

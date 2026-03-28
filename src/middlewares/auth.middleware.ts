import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../security/jwt/index.js";
import { HTTP_STATUS, ERROR_MESSAGE } from "../constants/index.js";

/**
 * Auth Middleware
 * Priority:
 * 1. Authorization Header (Bearer)
 * 2. HttpOnly Cookie: accessToken
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let token: string | undefined;

  // 1️⃣ Ambil dari Authorization Header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  }

  // 2️⃣ Fallback ke Cookie (accessToken)
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGE.JWT.INVALID_TOKEN });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);

    // attach user ke request
    req.user = {
      userId: decoded.payload.userId,
      email: decoded.payload.email,
      jti: decoded.payload.jti,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGE.JWT.TOKEN_EXPIRED });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGE.JWT.INVALID_TOKEN });
      return;
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER.ERROR });
  }
};

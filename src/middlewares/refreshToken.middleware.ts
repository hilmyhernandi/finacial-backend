import { type Request, type Response, type NextFunction } from "express";
import { HTTP_STATUS, ERROR_MESSAGE } from "../constants/index.js";

/**
 * Middleware untuk extract dan validate refresh token
 */
export const refreshTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const refreshToken = req.cookies.refresh_token || req.body.refreshToken;

  if (!refreshToken) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: `${ERROR_MESSAGE.AUTH.MISSING_REFRESH_TOKEN}`,
    });
    return;
  }

  // Attach refresh token to request for use in next middleware
  req.refreshToken = refreshToken;

  next();
};

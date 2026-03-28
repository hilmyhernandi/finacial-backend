import type { Request, Response, NextFunction } from "express";
import { csrfSecurity } from "../security/csrf/index.js";
import { HTTP_STATUS } from "../constants/httpStatus.constants.js";
import { ERROR_MESSAGE } from "constants/messages.constants.js";

export function csrfErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err === csrfSecurity.invalidTokenError) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGE.CSRF.TOKEN_INVALID,
    });
  }

  next(err);
}

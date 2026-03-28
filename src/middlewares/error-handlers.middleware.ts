import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { errorResponse } from "../utils/error/error.js";
import { ERROR_MESSAGE } from "../constants/messages.constants.js";
import { HTTP_STATUS } from "../constants/httpStatus.constants.js";
/**
 * Centralized error handling middleware
 */

export const errorHandlers: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof errorResponse) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: `${ERROR_MESSAGE.SERVER.ERROR}`,
  });
  return;
};

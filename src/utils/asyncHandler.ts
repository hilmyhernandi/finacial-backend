import { ParamsDictionary } from "express-serve-static-core";
import {
  AsyncRequestHandler,
  ValidRequestBody,
  ValidResponseBody,
  ValidLocals,
} from "../types/asyncHandler.js";

/**
 * Wrap async express handlers and forward errors to error middleware
 */
export const asyncHandler = <
  P = ParamsDictionary,
  ResBody extends ValidResponseBody = ValidResponseBody,
  ReqBody extends ValidRequestBody = ValidRequestBody,
  ReqQuery = unknown,
  Locals extends ValidLocals = ValidLocals,
>(
  fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
): AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

/**
 *
 * valid base type
 *
 */

export type ValidResponseBody =
  | object
  | unknown[]
  | string
  | number
  | boolean
  | null;

export type ValidRequestBody = object | unknown[] | null | undefined;

export type ValidLocals = Record<string, unknown>;

/**
 *
 * async request handler
 *
 */
export type AsyncRequestHandler<
  P = ParamsDictionary,
  ResBody extends ValidResponseBody = ValidResponseBody,
  ReqBody extends ValidRequestBody = ValidRequestBody,
  ReqQuery = ParsedQs,
  Locals extends ValidLocals = ValidLocals,
> = RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>;

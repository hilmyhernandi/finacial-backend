import { Request } from "express";
import { cookieOptions } from "../config/cookies.config.js";

export const setAccessTokenCookie = (
  req: Request,
  name: string,
  token: string,
) => {
  req.res?.cookie(`${name}`, token, cookieOptions);
};

export const clearAccessTokenCookie = (req: Request, name: string) => {
  req.res?.clearCookie(`${name}`, cookieOptions);
};

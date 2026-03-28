import type { Request, Response } from "express";
import { csrfSecurity } from "../security/csrf/index.js";
import { HTTP_STATUS } from "../constants/httpStatus.constants.js";
import * as storeCookies from "../stores/cookies.stores.js";

export class CsrfController {
  static getToken(req: Request, res: Response) {
    const token = csrfSecurity.generateToken(req, res);
    //XSRF-TOKEN
    storeCookies.setAccessTokenCookie(req, "XSRF-TOKEN", token);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      csrfToken: token,
    });
  }
}

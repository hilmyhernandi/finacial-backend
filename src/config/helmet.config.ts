import type { HelmetOptions } from "helmet";
import { ENV } from "./environment.config.js";
import { SECURITY } from "../constants/security.constants.js";

const isProd = ENV.web.isProd;

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": SECURITY.HELMET.CSP_DIRECTIVES.DEFAULT_SRC,
      "script-src": isProd
        ? SECURITY.HELMET.CSP_DIRECTIVES.SCRIPT_SRC.PROD
        : SECURITY.HELMET.CSP_DIRECTIVES.SCRIPT_SRC.DEV,
      "style-src": isProd
        ? SECURITY.HELMET.CSP_DIRECTIVES.STYLE_SRC.PROD
        : SECURITY.HELMET.CSP_DIRECTIVES.STYLE_SRC.DEV,
      "img-src": SECURITY.HELMET.CSP_DIRECTIVES.IMG_SRC,
      "connect-src": SECURITY.HELMET.CSP_DIRECTIVES.CONNECT_SRC,
      "font-src": SECURITY.HELMET.CSP_DIRECTIVES.FONT_SRC,
      "object-src": SECURITY.HELMET.CSP_DIRECTIVES.OBJECT_SRC,
      "base-uri": SECURITY.HELMET.CSP_DIRECTIVES.BASE_URI,
      "form-action": SECURITY.HELMET.CSP_DIRECTIVES.FORM_ACTION,
      "frame-ancestors": SECURITY.HELMET.CSP_DIRECTIVES.FRAME_ANCESTORS,
      "upgrade-insecure-requests":
        SECURITY.HELMET.CSP_DIRECTIVES.UPGRADE_INSECURE_REQUESTS,
    },
  },
};

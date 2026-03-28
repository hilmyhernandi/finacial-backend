import { TIME } from "./time.constants.js";
import { ERROR_MESSAGE } from "./messages.constants.js";

export const SECURITY = {
  BRUTE_FORCE: {
    WINDOW_MS: 15 * TIME.MINUTE,
    MAX_ATTEMPTS: 3,
    MESSAGE: ERROR_MESSAGE.REDIS.TOO_MANY_REQUESTS,
    PREFIX: "login_attempts",
  },

  RATE_LIMIT: {
    WINDOW_MS: 15 * TIME.MINUTE,
    MAX_REQUESTS: 10,
    MESSAGE: ERROR_MESSAGE.REDIS.TOO_MANY_REQUESTS_RATE_LIMIT,
    PREFIX: "rate_limit",
  },

  CSRF: {
    COOKIE_NAME: "__Host-csrf",
    HEADER_NAME: "x-csrf-token",
    MESSAGE: ERROR_MESSAGE.CSRF.TOKEN_INVALID,
  },

  BCRYPT: {
    BCRYPT_ROUNDS: 12,
  },

  HELMET: {
    CSP_DIRECTIVES: {
      DEFAULT_SRC: ["'self'"],

      SCRIPT_SRC: {
        PROD: ["'self'"],
        DEV: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },

      STYLE_SRC: {
        PROD: ["'self'", "https:", "'unsafe-inline'"],
        DEV: ["'self'", "'unsafe-inline'"],
      },

      IMG_SRC: ["'self'", "data:", "https:"],
      CONNECT_SRC: ["'self'", "https:"],
      FONT_SRC: ["'self'", "https:", "data:"],

      OBJECT_SRC: ["'none'"],
      BASE_URI: ["'self'"],
      FORM_ACTION: ["'self'"],
      FRAME_ANCESTORS: ["'self'"],

      UPGRADE_INSECURE_REQUESTS: [],
    },

    POLICIES: {
      SAME_ORIGIN: "same-origin",
      STRICT_REFERRER: "strict-origin-when-cross-origin",
      NO_REFERRER: "no-referrer",
    },

    HSTS: {
      MAX_AGE: 63_072_000,
    },
  },
} as const;

import session from "express-session";
import { ENV } from "./environment.config.js";

const sessionConfig = session({
  secret: ENV.security.sessionSecret,
  resave: false,
  saveUninitialized: false,
  unset: "keep",
  cookie: {
    httpOnly: true,
    secure: ENV.web.isProd,
    sameSite: ENV.web.isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});

export default sessionConfig;

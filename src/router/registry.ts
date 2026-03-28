import { csrfRouter } from "./csrf-security.router.js";
import { authRouter } from "./auth.router.js";

export const registry = {
  csrfRouter,
  authRouter,
};

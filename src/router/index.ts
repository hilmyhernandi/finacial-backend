import { Router } from "express";
import { registry } from "./registry.js";
export const router = Router();

router.use("/auth", registry.authRouter);
router.use("/csrf", registry.csrfRouter);

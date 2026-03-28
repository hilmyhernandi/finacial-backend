import { Router } from "express";
import { CsrfController } from "../controller/csrf-security.controller.js";

export const csrfRouter = Router();
csrfRouter.get("/token", CsrfController.getToken);

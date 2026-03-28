import express, { Application } from "express";
import cookieParser from "cookie-parser";
export const web: Application = express();

web.set("trust proxy", 1);
web.disable("x-powered-by");
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(cookieParser());

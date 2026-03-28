import helmet from "helmet";
import { helmetConfig } from "../../config/helmet.config.js";

export const helmetMiddleware = helmet(helmetConfig);

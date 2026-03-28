import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ENV } from "./environment.config.js";
import path from "path";
import { getDirname } from "../utils/path.js";

const __dirname = getDirname(import.meta.url);

const logDir = path.join(__dirname, "../../logs/server");
const logDirRedis = path.join(__dirname, "../../logs/redis");
const logDirRabbitMQ = path.join(__dirname, "../../logs/rabbitmq");

const logLevel: "debug" | "info" = ENV.web.isProd ? "info" : "debug";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }),
);

const filterLevel = (level: "info" | "warn" | "error") =>
  winston.format((info) => (info.level === level ? info : false))();

const createLogger = (logDirectory: string) => {
  return winston.createLogger({
    level: logLevel,
    format: logFormat,
    transports: [
      ...(ENV.web.isProd ? [] : [new winston.transports.Console()]),

      new winston.transports.File({
        filename: path.join(logDirectory, "error.log"),
        level: "error",
        format: winston.format.combine(filterLevel("error"), logFormat),
      }),

      new winston.transports.File({
        filename: path.join(logDirectory, "warn.log"),
        level: "warn",
        format: winston.format.combine(filterLevel("warn"), logFormat),
      }),

      new winston.transports.File({
        filename: path.join(logDirectory, "info.log"),
        level: "info",
        format: winston.format.combine(filterLevel("info"), logFormat),
      }),

      new DailyRotateFile({
        filename: path.join(logDirectory, "daily-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        maxSize: "10m",
        maxFiles: "2d",
      }),
    ],
  });
};

const logger = createLogger(logDir);
const loggerRedis = createLogger(logDirRedis);
const loggerRabbitMQ = createLogger(logDirRabbitMQ);
export { logger, loggerRedis, loggerRabbitMQ };

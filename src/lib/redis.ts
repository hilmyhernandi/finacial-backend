import { createClient } from "redis";
import { redisConfig } from "../config/redis.config.js";
import { loggerRedis } from "../config/logger.config.js";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "../constants/messages.constants.js";

export const redisClient = createClient(redisConfig);

/**
 * Redis lifecycle events
 */
redisClient.on("connect", () => {
  loggerRedis.info(`${SUCCESS_MESSAGE.REDIS.CONNECTION_SUCCESS}`);
});

redisClient.on("ready", () => {
  loggerRedis.info(`${SUCCESS_MESSAGE.REDIS.READY}`);
});

redisClient.on("reconnecting", () => {
  loggerRedis.warn(`${SUCCESS_MESSAGE.REDIS.RECONNECTED}`);
});

redisClient.on("error", (err) => {
  loggerRedis.error(`${ERROR_MESSAGE.REDIS.CONNECTION_ERROR}: ${err.message}`, {
    message: err.message,
  });
});

/**
 * Explicit connect (important for control)
 */
export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export const disconnectRedisSafely = async (): Promise<void> => {
  if (!redisClient.isOpen) return;

  try {
    await redisClient.quit();
    loggerRedis.info(SUCCESS_MESSAGE.REDIS.CONNECTION_CLOSED);
  } catch (error) {
    loggerRedis.error("Redis quit failed, forcing disconnect", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    redisClient.disconnect();
  }
};

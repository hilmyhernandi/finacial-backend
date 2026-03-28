import { web } from "./web.js";
import { ENV } from "./config/environment.config.js";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "./constants/messages.constants.js";
import { logger } from "./config/logger.config.js";
import { connectRedis } from "./lib/redis.js";
import { RabbitMQ } from "./lib/rabbitmq.js";

const PORT = ENV.web.port;
let shuttingDown = false;

async function startServer() {
  try {
    await connectRedis();
    await RabbitMQ.getInstance();
    const server = web.listen(PORT, () => {
      logger.info(`${SUCCESS_MESSAGE.SERVER.RUNNING} on port ${PORT}`);
    });

    server.on("error", (err: Error) => {
      logger.error(`${ERROR_MESSAGE.SERVER.ERROR}: ${err.message}`);
    });

    const shutDown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;

      logger.info(`${SUCCESS_MESSAGE.SERVER.SHUTTING_DOWN} (${signal})`);

      const forceExitTimeout = setTimeout(() => {
        logger.error(ERROR_MESSAGE.SERVER.FORCE_SHUTDOWN);
        process.exit(1);
      }, 10000);

      server.close(() => {
        clearTimeout(forceExitTimeout);
        logger.info(SUCCESS_MESSAGE.SERVER.SHUTDOWN_COMPLETE);
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutDown("SIGTERM"));
    process.on("SIGINT", () => shutDown("SIGINT"));

    process.on("unhandledRejection", (reason, promise) => {
      logger.error(ERROR_MESSAGE.SERVER.UNHANDLED, {
        promise,
        reason,
      });
    });

    process.on("uncaughtException", (err) => {
      logger.error(ERROR_MESSAGE.SERVER.UNHANDLED, err);
      process.exit(1);
    });
  } catch (error) {
    logger.error(ERROR_MESSAGE.SERVER.START_FAILED, error);
    process.exit(1);
  }
}

startServer();

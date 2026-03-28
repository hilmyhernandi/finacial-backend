import { TIME } from "./time.constants.js";
import { ENV } from "../config/environment.config.js";

export const REDIS = {
  CONNECTION: {
    DEFAULT_PORT: ENV.redis.port,
    DEFAULT_HOST: ENV.redis.host,
    DEFAULT_USERNAME: ENV.redis.username,
    DEFAULT_PASSWORD: ENV.redis.password,
  },

  CONNECTION_CLOUD: {
    DEFAULT_PORT_CLOUD: ENV.redisCloud.portCloud,
    DEFAULT_HOST_CLOUD: ENV.redisCloud.hostCloud,
    DEFAULT_USERNAME_CLOUD: ENV.redisCloud.usernameCloud,
    DEFAULT_PASSWORD_CLOUD: ENV.redisCloud.passwordCloud,
  },

  RETRY: {
    MAX_RETRIES: 10,
    BASE_DELAY: 100,
    MAX_DELAY: 10 * TIME.SECOND,
  },

  OPTIONS: {
    MAX_RETRIES_PER_REQUEST: 100,
  },

  PREFIX: {
    SESSION: "sess:",
    CACHE: "cache:",
    QUEUE: "queue:",
  },
} as const;

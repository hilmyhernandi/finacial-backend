import { RedisClientOptions } from "redis";
import { ENV } from "./environment.config.js";
import { redisRetryPolicy } from "../policy/redisRetry.policy.js";

const socketConfig = ENV.redis.tls
  ? {
      host: ENV.redisCloud.hostCloud,
      port: ENV.redisCloud.portCloud,
      tls: true as const,
      reconnectStrategy: redisRetryPolicy,
    }
  : {
      host: ENV.redis.host,
      port: ENV.redis.port,
      reconnectStrategy: redisRetryPolicy,
    };

export const redisConfig: RedisClientOptions = {
  socket: socketConfig,
  username: ENV.redis.username,
  password: ENV.redis.password,
};

import { ENV } from "./environment.config.js";
export const RABBITMQ_CONFIG = {
  uri: ENV.rabbitMQ.uri,
  PREFETCH: 1,
} as const;

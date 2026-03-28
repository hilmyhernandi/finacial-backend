import "dotenv/config";
import { envSchema } from "./env.schema.js";

const env = envSchema.parse(process.env);

export const ENV = {
  web: {
    port: env.PORT,
    env: env.NODE_ENV,
    isProd: env.NODE_ENV === "production",
  },

  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    tls: env.REDIS_TLS,
  },

  redisCloud: {
    hostCloud: env.REDIS_HOST_CLOUD,
    portCloud: env.REDIS_PORT_CLOUD,
    usernameCloud: env.REDIS_USERNAME_CLOUD,
    passwordCloud: env.REDIS_PASSWORD_CLOUD,
  },

  rabbitMQ: {
    uri: env.RABBITMQ_URI,
  },

  email: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },

  security: {
    sessionSecret: env.SESSION_SECRET,
    csrfSecret: env.CSRF_SECRET,
    accessTokenSecret: env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET!,
  },
} as const;

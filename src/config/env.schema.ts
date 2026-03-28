import { z } from "zod";

/**
 * Environment Variables Schema
 *
 * - Validates env variables at startup
 * - Prevents runtime misconfiguration
 * - Ensures correct types & required fields
 */

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test", "staging"])
    .default("development"),

  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number")
    .transform(Number)
    .default(3000),

  /**
   * Redis
   */
  REDIS_HOST: z.string().default("localhost"),

  REDIS_PORT: z.coerce.number().int().positive().default(6379),

  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TLS: z.coerce.boolean().default(false),

  /**
   * Redis Cloud
   */

  REDIS_HOST_CLOUD: z.string(),
  REDIS_PORT_CLOUD: z.coerce.number().int().positive(),
  REDIS_USERNAME_CLOUD: z.string(),
  REDIS_PASSWORD_CLOUD: z.string(),

  /**
   * Session & Security
   */

  SESSION_SECRET: z.string().min(32),
  CSRF_SECRET: z.string().min(32),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),

  /**
   * RabbitMQ
   */
  RABBITMQ_URI: z.string().url(),

  /**
   * Email Configuration
   */
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(8),
});

export type EnvSchema = z.infer<typeof envSchema>;

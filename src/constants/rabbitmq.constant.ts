export const RABBITMQ_CONSTANTS = {
  EMAIL: "email.queue",
  EMAIL_DLQ: "email.queue.dlq",
  EXCHANGE_RETRY: "retry.exchange",
  EXCHANGE_DLQ: "dlq.exchange",
  MAX_RETRY: 5,
  RETRY_DELAY_MS: 5000,
};

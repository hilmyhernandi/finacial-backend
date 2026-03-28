export const ERROR_MESSAGE = {
  SERVER: {
    ERROR: "HTTP server error",
    DOWN: "Server is not available",
    START_FAILED: "Failed to start server",
    SHUTDOWN_FAILED: "Error occurred during server shutdown",
    FORCE_SHUTDOWN: "Server force shutdown due to timeout",
    UNHANDLED: "Unhandled server error",
  },

  REQUEST: {
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
  },

  AUTH: {
    INVALID_CREDENTIALS: "Invalid username or password",
    SIGNUP_FAILED: "Sign up failed",
    USER_ALREADY_EXISTS: "User already registered",
    EMAIL_ALREADY_EXISTS: "Email already registered",
    USERNAME_ALREADY_EXISTS: "Username already taken",
    INVALID_PASSWORD: "Invalid password",
    EMAIL_NOT_FOUND: "Email not found",
    MISSING_REFRESH_TOKEN: "Missing refresh token",
  },

  JWT: {
    TOKEN_EXPIRED: "Token expired",
    INVALID_TOKEN: "Invalid token",
    MISSING_TOKEN: "Missing access token",
    INVALID_FORMAT: "Invalid token format",
    REVOKED_TOKEN: "Token has been revoked",
    GENERATION_FAILED: "Failed to generate tokens",
  },

  REDIS: {
    ERROR: "Redis error",
    CONNECTION_ERROR: "Failed to connect to Redis server",
    AUTHENTICATION_ERROR: "Redis authentication failed",
    TIMEOUT_ERROR: "Redis operation timed out",
    GENERAL_ERROR: "An error occurred with Redis",
    TOO_MANY_REQUESTS:
      "Too many login attempts from this IP, please try again after 15 minutes",
    TOO_MANY_REQUESTS_RATE_LIMIT:
      "Too many requests from this IP, please try again later",
    RETRY_LIMIT_REACHED: "Redis retry limit reached",
    CONNECTION_CLOSED: "Redis connection closed",
  },

  RABBITMQ: {
    CONNECTION_ERROR: "Failed to connect to RabbitMQ server",
    CHANNEL_ERROR: "RabbitMQ channel error",
    PUBLISH_FAILED: "Failed to publish message to queue",
  },

  CSRF: {
    TOKEN_INVALID: "Invalid or missing CSRF token",
  },
};

export const SUCCESS_MESSAGE = {
  SERVER: {
    RUNNING: "Server is running",
    STARTED: "Server started successfully",
    SHUTTING_DOWN: "Server is shutting down",
    SHUTDOWN_COMPLETE: "Server shutdown completed gracefully",
  },

  REDIS: {
    CONNECTION_SUCCESS: "Successfully connected to Redis server",
    READY: "Redis is ready",
    RECONNECTED: "Successfully reconnected to Redis server",
    CONNECTION_CLOSED: "Redis connection closed successfully",
  },

  RABBITMQ: {
    CONNECTION_SUCCESS: "Successfully connected to RabbitMQ server",
  },

  USERS: {
    SIGN_UP: "User registered successfully",
    SIGN_IN: "User signed in successfully",
    SIGN_OUT: "User signed out successfully",
    
  },
};

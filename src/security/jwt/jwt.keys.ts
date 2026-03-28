export const jwtKeys = {
  accessToken: (email: string, userId: string) =>
    `jwt:access:${email}:${userId}`,
  refreshTokens: (email: string, userId: string) =>
    `jwt:refresh:${email}${userId}`,
  blackListRefreshToken: (userId: string) => `jwt:blacklist:${userId}`,
};

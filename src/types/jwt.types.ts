export interface JwtPayload {
  userId: string;
  email: string;
  jti: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  payload: JwtPayload;
  issuedAt: number;
  expiresAt: number;
}

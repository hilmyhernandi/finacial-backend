import jwt, { type Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { jwtConfig } from "../../config/jwt.config.js";
import type {
  JwtPayload,
  TokenResponse,
  //DecodedToken,
} from "../../types/jwt.types.js";
import * as service from "../../service/redis.service.js";
//import { decodeToken } from "./jwt.decode.js";
//import { errorResponse } from "../../utils/error/error.js";

export const generateTokens = async (
  userId: string,
  email: string,
): Promise<TokenResponse> => {
  const jti = uuidv4();
  const payload: JwtPayload = {
    userId,
    email,
    jti,
  };

  const accessToken = jwt.sign(payload, jwtConfig.access.secret as Secret, {
    expiresIn: jwtConfig.access.expiresIn,
    algorithm: jwtConfig.signing.algorithm,
    issuer: jwtConfig.signing.issuer,
    audience: jwtConfig.signing.audience,
  });

  const refreshToken = jwt.sign(payload, jwtConfig.refresh.secret as Secret, {
    expiresIn: jwtConfig.refresh.expiresIn,
    algorithm: jwtConfig.signing.algorithm,
    issuer: jwtConfig.signing.issuer,
    audience: jwtConfig.signing.audience,
  });

  await service.addAccessToken(userId, email, accessToken);
  await service.addRefreshToken(userId, email, refreshToken);

  return { accessToken, refreshToken };
};

// export const refreshAccessToken = async (
//   refreshToken: string,
// ): Promise<string> => {
//   const result = await decodeToken<DecodedToken>(refreshToken);

//   // cek apakah expired nya sudah lewat
//   // if (decodedToken && Date.now() >= decodedToken.exp * 1000) {
//   //   throw new errorResponse("Refresh token has expired", 401);
//   // }

//   const { payload } = result;
//   console.log("Decoded Token:", payload);

//   return "";
// };

// import jwt, {
//   type Secret,
//   type VerifyOptions,
//   type JwtPayload as JwtPayloadFromLib,
// } from "jsonwebtoken";
// import { jwtConfig } from "../../config/jwt.config.js";
// import type { DecodedToken, JwtPayload } from "../../types/jwt.types.js";
// import { errorResponse } from "utils/error/error.js";

// export const verifyRefreshToken = (token: string): DecodedToken => {
//   try {
//     const verifyOptions: VerifyOptions = {
//       algorithms: [jwtConfig.signing.algorithm],
//       issuer: jwtConfig.signing.issuer,
//       audience: jwtConfig.signing.audience,
//     };

//     const decoded = jwt.verify(
//       token,
//       jwtConfig.refresh.secret as Secret,
//       verifyOptions,
//     );

//     const payload = decoded as JwtPayload;
//     const decodedWithClaims = decoded as JwtPayloadFromLib;
//     const issuedAt = decodedWithClaims.iat || Math.floor(Date.now() / 1000);
//     const expiresAt = Number.isInteger(decodedWithClaims.exp)
//       ? decodedWithClaims.exp
//       : 0;

//     const durationInSeconds = expiresAt! - issuedAt;
//     const durationInDays = durationInSeconds / 86400;

//     if (durationInDays === 0) {
//       //blacklistToken(payload.userId);
//       throw new errorResponse(
//         "Refresh token has expired and has been revoked",
//         401,
//       );
//     }
//   } catch {
//     throw new errorResponse("Invalid refresh token", 401);
//   }
// };

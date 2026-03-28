import bcrypt from "bcrypt";
import { SECURITY } from "../../constants/security.constants.js";

class PasswordBcrypt {
  private readonly saltRounds = SECURITY.BCRYPT.BCRYPT_ROUNDS;

  public generateHash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.saltRounds);
  }

  public isPasswordValid(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export const passwordBcrypt = new PasswordBcrypt();

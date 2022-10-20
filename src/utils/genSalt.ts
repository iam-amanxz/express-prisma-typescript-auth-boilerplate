import bcrypt from "bcryptjs";

/**
 * Generates random string of salt
 * @returns random string
 */
export const generateSalt = (): string => {
  return bcrypt.genSaltSync(10);
};

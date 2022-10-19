import bcrypt from "bcryptjs";

export const generateSalt = (): string => {
  return bcrypt.genSaltSync(10);
};

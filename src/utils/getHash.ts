import bcrypt from "bcryptjs";

export const generateHash = (password: string, salt: string): string => {
  return bcrypt.hashSync(password, salt);
};

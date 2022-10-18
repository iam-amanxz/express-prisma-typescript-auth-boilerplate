import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../../.";
import logger from "../../logger";

interface SignupDto {
  email: string;
  password: string;
}
interface SigninDto {
  email: string;
  password: string;
}

export const authService = {
  signUp: async (dto: SignupDto): Promise<User> => {
    const { email, password } = dto;

    // check if email exists already (throw if yes)
    const emailExists = await prisma.user.findFirst({ where: { email } });
    if (emailExists) {
      logger.error("Username already exists");
      throw new Error("Username already exists");
    }

    // hash password
    let salt: string;
    let hash: string;
    // 1. generate salt
    try {
      salt = bcrypt.genSaltSync(10);
      logger.debug("Salt generated: " + salt);
    } catch (error) {
      logger.error((error as Error).message);
      throw error;
    }
    // 2. hash = password + salt
    try {
      hash = bcrypt.hashSync(password, salt);
      logger.debug("Hash generated: " + hash);
    } catch (error) {
      logger.error((error as Error).message);
      throw error;
    }

    // save user
    const newUser = await prisma.user.create({ data: { email, hash, salt } });
    logger.debug("New user created: " + newUser.email);

    return newUser;
  },
  signIn: async (dto: SigninDto): Promise<User> => {
    const { email, password } = dto;

    // check user exists
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      logger.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }

    // validate password
    // 1. fetch salt and hash
    const { hash, salt } = existingUser;
    // 2. hash user entered password with salt
    let newHash: string;
    try {
      newHash = bcrypt.hashSync(password, salt);
    } catch (error) {
      logger.error((error as Error).message);
      throw error;
    }
    // 3. verify new hash === hash
    if (hash !== newHash) {
      throw new Error("Invalid credentials");
    }

    return existingUser;
  },
  signOut: () => {},
};

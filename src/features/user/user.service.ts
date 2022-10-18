import { User } from "@prisma/client";
import { prisma } from "../..";
import logger from "../../logger";

export const userService = {
  getUserByEmail: async (email: string): Promise<User> => {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      logger.error("User not found");
      throw new Error("User not found");
    }

    return existingUser;
  },
};

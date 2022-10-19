import { User as PrismaUser } from "@prisma/client";
import db from "../db";

interface CreateUserDto {
  email: string;
  hash: string;
  salt: string;
}

export class UserApi {
  async findByEmail(email: string): Promise<User | null> {
    return await db.user.findFirst({ where: { email } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await db.user.create({ data: { ...dto } });
  }
}

export type User = PrismaUser;

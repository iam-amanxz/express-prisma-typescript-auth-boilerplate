import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const db = new PrismaClient();

const cleanDatabase = async () => {
  logger.debug("Cleaning database 🗑️");

  const tablenames = await db.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== "_prisma_migrations") {
      try {
        await db.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};

export { cleanDatabase };
export default db;

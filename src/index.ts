import express from "express";
import morgan from "morgan";
import session, { SessionOptions } from "express-session";
import Redis from "ioredis";
import * as connectRedis from "connect-redis";
import logger from "./logger";
import createRouter from "./router";
import { PrismaClient } from "@prisma/client";
import { deserializeUser } from "./middleware";

export const prisma = new PrismaClient();
const SERVER_PORT = 5000;
const RedisStore = connectRedis.default(session);

const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: "SESSION_SECRET",
  cookie: {
    maxAge: 1209600000,
    sameSite: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  store: new RedisStore({
    client: new Redis(),
  }),
};

const main = async () => {
  const app = express();
  const router = createRouter();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session(sessionOptions));
  app.use(morgan("combined"));
  app.use(deserializeUser);
  app.use("/api/v1", router);

  await app.listen(SERVER_PORT);
};

main().then(() => {
  logger.debug(`Server is up at http://localhost:${SERVER_PORT}`);
});

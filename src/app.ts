import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import session, { SessionOptions } from "express-session";
import Redis from "ioredis";
import * as connectRedis from "connect-redis";
import createRouter from "./router";
import { deserializeUser, globalErrorHandler } from "./middleware";

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

const app = express();
const router = createRouter();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(morgan("combined"));
app.use(deserializeUser);
app.use("/api/v1", router);
app.use(globalErrorHandler);

export default app;

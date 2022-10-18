import session from "express-session";
import express from "express";
import { User } from "@prisma/client";

declare module "express-session" {
  export interface SessionData extends session.SessionData {
    email?: string;
  }
}

declare module "express" {
  export interface Request extends express.Request {
    user?: User;
  }
}

import session from "express-session";

declare module "express-session" {
  export interface SessionData extends session.SessionData {
    email?: string;
  }
}

import { NextFunction, Request, Response } from "express";
import { userService } from "../features/user";
import logger from "../logger";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if no session continue
  if (!req.session) {
    logger.debug("No session found");
    return next();
  }

  logger.debug("Session found, deserializing user");
  // if session fetch user and attach to the request
  //   @ts-ignore
  const user = await userService.getUserByEmail(req.session.email);

  //   @ts-ignore
  req.user = user;
  return next();
};

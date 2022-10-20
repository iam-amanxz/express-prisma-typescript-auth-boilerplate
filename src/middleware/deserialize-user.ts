import { NextFunction, Request, Response } from "express";
import { UserApi } from "../api";
import { ResourceNotFoundException } from "../exceptions-and-responses";
import { UserService } from "../features/user";

/**
 * Fetches user data from the db and attaches to the request if logged in
 */
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.email) {
    return next();
  }

  const user = await new UserService(new UserApi()).getByEmail(
    req.session.email
  );

  if (!user) {
    return next(new ResourceNotFoundException());
  }

  req.user = user;

  next();
};
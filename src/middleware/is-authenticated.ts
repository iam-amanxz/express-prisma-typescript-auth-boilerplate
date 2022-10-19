import { NextFunction, Request, Response } from "express";
import { UnauthenticatedException } from "../exceptions-and-responses";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.email) {
    return next(new UnauthenticatedException());
  }

  next();
};

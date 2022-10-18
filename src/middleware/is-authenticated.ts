import { NextFunction, Request, Response } from "express";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if no session throw
  if (!req.session.email) {
    return res.send("Un authenticated");
  }

  return next();
};

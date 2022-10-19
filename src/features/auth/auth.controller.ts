import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { autoInjectable } from "tsyringe";
import {
  ApiResponse,
  ValidationException,
} from "../../exceptions-and-responses";
import { mapExpressErrorsToLocal } from "../../utils";
import { AuthService } from "./auth.service";

@autoInjectable()
export class AuthController {
  constructor(private service: AuthService) {}

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors);
      return next(new ValidationException(errorMap));
    }

    const { username, password } = req.body;

    const email = username + "@mydomain.com";

    try {
      await this.service.signUp({ email, password });
    } catch (error) {
      return next(error);
    }

    const session = req.session;
    session.email = email;

    res
      .status(201)
      .json(ApiResponse.ok({ path: req.url, payload: session.id }));
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMap = mapExpressErrorsToLocal(errors);
      return next(new ValidationException(errorMap));
    }

    const { username, password } = req.body;

    const email = username + "@mydomain.com";

    try {
      await this.service.signIn({ email, password });
    } catch (error) {
      return next(error);
    }

    const session = req.session;
    session.email = email;

    res
      .status(200)
      .json(ApiResponse.ok({ path: req.url, payload: session.id }));
  };

  signOut = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((error) => {
      if (error) return next(error);
    });
    res.status(200).json(ApiResponse.ok({ path: req.url }));
  };

  getMe = (req: Request, res: Response) => {
    res.status(200).json(ApiResponse.ok({ path: req.url, payload: req.user }));
  };
}

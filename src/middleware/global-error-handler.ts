import { NextFunction, Request, Response } from "express";
import {
  ApiResponse,
  EmailExistsException,
  GenericException,
  ValidationException,
} from "../exceptions-and-responses";

/**
 * Handles all unhandled errors. Catches errors passed by next(error)
 */
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof EmailExistsException) {
    return res
      .status(EmailExistsException.code)
      .json(ApiResponse.conflict({ path: req.url, ex: error }));
  }

  if (error instanceof ValidationException) {
    return res
      .status(ValidationException.code)
      .json(ApiResponse.badValidation({ path: req.url, ex: error }));
  }

  return res
    .status(GenericException.code)
    .json(ApiResponse.genericError({ path: req.url, ex: error as Error }));
};

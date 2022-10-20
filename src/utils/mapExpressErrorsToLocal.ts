import { Result, ValidationError } from "express-validator";

import { ErrorMessage } from "../types";

/**
 * Maps ValidationError to ErrorMessage
 * @param errors ValidationError errors thrown by express-validator
 * @returns ErrorMessage[]
 */
export const mapExpressErrorsToLocal = (
  errors: Result<ValidationError>
): ErrorMessage[] => {
  const errorMap = errors.array().map((err) => ({
    param: err.param,
    message: err.msg,
  }));

  return errorMap;
};

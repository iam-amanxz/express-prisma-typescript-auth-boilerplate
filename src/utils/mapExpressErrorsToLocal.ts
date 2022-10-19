import { Result, ValidationError } from "express-validator";

import { ErrorMessage } from "../types";

export const mapExpressErrorsToLocal = (
  errors: Result<ValidationError>
): ErrorMessage[] => {
  const errorMap = errors.array().map((err) => ({
    param: err.param,
    message: err.msg,
  }));

  return errorMap;
};

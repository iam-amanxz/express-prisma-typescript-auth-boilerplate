import { ErrorMessage } from "../types";

export class GenericException extends Error {
  static code = 500;

  constructor(message: string) {
    super(message);
  }
}

export class UnauthenticatedException extends Error {
  static code = 401;
  static message = "You are not authenticated to access this resource";

  constructor() {
    super(UnauthenticatedException.message);
  }
}

export class UnauthorizedException extends Error {
  static code = 403;
  static message = "You are not allowed to access this resource";

  constructor() {
    super(UnauthorizedException.message);
  }
}

export class ResourceNotFoundException extends Error {
  static code = 404;
  static message = "Resource not found";

  constructor() {
    super(ResourceNotFoundException.message);
  }
}

export class ValidationException extends Error {
  errors: ErrorMessage[];
  static code = 400;

  constructor(errors: ErrorMessage[] = []) {
    super("Request validation failed");
    this.errors = errors;
  }
}

export class ConflictException extends Error {
  static code = 409;

  constructor(message: string) {
    super(message);
  }
}

export class UsernameExistsException extends ConflictException {
  constructor(username: string) {
    super(`Username ${username} already exists`);
  }
}

export class EmailExistsException extends ConflictException {
  constructor(email: string) {
    super(`Email ${email} already exists`);
  }
}

export class InvalidCredentialsException extends Error {
  static code = 400;
  static message = "Invalid credentials";

  constructor() {
    super(InvalidCredentialsException.message);
  }
}

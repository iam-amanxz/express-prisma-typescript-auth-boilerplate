import { ResponseResource } from "../types";
import {
  ConflictException,
  GenericException,
  ResourceNotFoundException,
  UnauthenticatedException,
  UnauthorizedException,
  ValidationException,
} from ".";

export class ApiResponse {
  static ok<T>(args: { path: string; payload?: T }): ResponseResource<T> {
    return {
      success: true,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: args?.payload,
    };
  }

  static created<T>(args: { path: string; payload?: T }): ResponseResource<T> {
    return {
      success: true,
      statusCode: 201,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: args?.payload,
    };
  }

  static noContent<T>(args: {
    path: string;
    payload?: T;
  }): ResponseResource<T> {
    return {
      success: true,
      statusCode: 204,
      timestamp: new Date().toISOString(),
      path: args.path,
      payload: args?.payload,
    };
  }

  static genericError<T>(args: {
    path: string;
    ex: GenericException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: GenericException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }

  static badValidation<T>(args: {
    path: string;
    ex: ValidationException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: ValidationException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
      errors: args.ex.errors,
    };
  }

  static badRequest<T>(args: { path: string; ex: Error }): ResponseResource<T> {
    return {
      success: false,
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }

  static notFound<T>(args: {
    path: string;
    ex: ResourceNotFoundException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: ResourceNotFoundException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }

  static conflict<T>(args: {
    path: string;
    ex: ConflictException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: ConflictException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }

  static unauthenticated<T>(args: {
    path: string;
    ex: UnauthenticatedException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: UnauthenticatedException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }

  static unauthorized<T>(args: {
    path: string;
    ex: UnauthenticatedException;
  }): ResponseResource<T> {
    return {
      success: false,
      statusCode: UnauthorizedException.code,
      timestamp: new Date().toISOString(),
      path: args.path,
      errorMessage: args.ex.message,
    };
  }
}

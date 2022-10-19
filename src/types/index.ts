export interface ErrorMessage {
  [key: string]: string;
}

export interface ResponseResource<T> {
  timestamp: string;
  success: boolean;
  statusCode: number;
  path: string;
  payload?: T;
  errorMessage?: string;
  errors?: ErrorMessage[];
}

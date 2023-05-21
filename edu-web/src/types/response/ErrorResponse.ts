export type ErrorResponse = {
  requestId: string;
  httpStatusCode: number;
  error: ErrorType;
};

export type ErrorType = {
  code: string;
  message: string;
  stack: string;
};

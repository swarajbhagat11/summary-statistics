interface ErrorResponse {
  error: string;
  message: any;
}

export interface ApplicationError extends Error {
  ErrorCode: number;
  ErrorResponse: ErrorResponse;
}

export const instanceOfApplicationError = (data: any): data is ApplicationError => {
  return 'ErrorCode' in data && 'ErrorResponse' in data;
};

class ErrorType {
  _errorCode: number;
  _error: string;
  constructor(errorCode: number, error: string) {
    this._errorCode = errorCode;
    this._error = error;
  }

  newError = (message: any, error: string = ''): ApplicationError => {
    error = error || this._error;
    return {
      ErrorCode: this._errorCode,
      ErrorResponse: { error, message },
    } as ApplicationError;
  };
}

const badRequestErrorType: ErrorType = new ErrorType(400, 'Bad Request');
const unauthorizedErrorType: ErrorType = new ErrorType(401, 'Unauthorized');
const forbiddenErrorType: ErrorType = new ErrorType(403, 'Forbidden');
const notFoundErrorType: ErrorType = new ErrorType(404, 'Not Found');
const conflictErrorType: ErrorType = new ErrorType(409, 'Conflict');
const unprocessableEntityErrorType: ErrorType = new ErrorType(422, 'Unprocessable Entity');
const internalServerErrorType: ErrorType = new ErrorType(500, 'Internal Server Error');

export const AppError = {
  BadRequestError: badRequestErrorType.newError,
  UnauthorizedError: unauthorizedErrorType.newError,
  ForbiddenError: forbiddenErrorType.newError,
  NotFoundError: notFoundErrorType.newError,
  ConflictError: conflictErrorType.newError,
  unprocessableEntityError: unprocessableEntityErrorType.newError,
  InternalServerError: internalServerErrorType.newError,
};

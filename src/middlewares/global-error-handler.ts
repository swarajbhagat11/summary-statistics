import { NextFunction, Request, Response } from 'express';
import { APIResponse } from 'src/utils/api-response';
import logger from '@utils/logger';

export const globalErrorHandler = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<Response<any>> => {
  logger.error('[globalErrorHandler:globalErrorHandler] - Passing error to APIResponse.', err);
  return APIResponse.errorResponse(res, err);
};

export const processUnhandledError = async (req: Request, res: Response, next: NextFunction) => {
  // this is catching exception which not caught by globalErrorHandler
  process
    .once('unhandledRejection', (err, promise) => {
      logger.error('[globalErrorHandler:processUnhandledError] - Promise unhandled rejection.', err, promise);
      return APIResponse.errorResponse(res, err);
    })
    .once('uncaughtException', (err) => {
      logger.error('[globalErrorHandler:processUnhandledError] - Uncaught exception. Exiting the process.', err);
      process.exit(1);
    });
  next();
};

import { Request, Response, NextFunction } from 'express';
import logger from '@utils/logger';
import { validationResult } from 'express-validator';
import { AppError } from '@utils/app-error';
import { APIResponse } from '@utils/api-response';

export const asyncControllerWrapper = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = validationResult(req);
    if (result.isEmpty()) {
      return await fn(req, res, next);
    } else {
      logger.error('[asyncControllerWrapper:asyncControllerWrapper] - error while data validation.', result.array());
      return APIResponse.errorResponse(res, AppError.BadRequestError(result.array(), 'Data Validation Error'));
    }
  } catch (err) {
    logger.error('[asyncControllerWrapper:asyncControllerWrapper] - Passing error to error middleware.', err);
    return next(err);
  }
};

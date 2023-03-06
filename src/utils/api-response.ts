import { Response } from 'express';
import { AppError, instanceOfApplicationError } from '@utils/app-error';
import logger from '@utils/logger';

export const APIResponse = {
  okResponse: (res: Response, data: any = {}): Response<any> => {
    logger.info('[APIResponse:okResponse] - API call completed successfully.');
    return res.status(200).json(data);
  },

  createResponse: (res: Response, data: any = {}): Response<any> => {
    logger.info('[APIResponse:createResponse] - API call completed successfully.');
    return res.status(201).json(data);
  },

  deleteResponse: (res: Response, deleteRecordCnt: number | null): Response<any> => {
    const message =
      (deleteRecordCnt || 0) > 0
        ? 'The record has been successfully deleted from the system.'
        : 'The record has not been deleted from the system.';
    logger.info('[APIResponse:deleteResponse] - API call completed successfully.');
    return res.status(200).json({ message });
  },

  errorResponse: (res: Response, err: any): Response<any> => {
    logger.error('[APIResponse:errorResponse] - Reponding error to the user.', err);
    if (instanceOfApplicationError(err)) {
      return res.status(err.ErrorCode).json(err.ErrorResponse);
    } else {
      const internalServerError = AppError.InternalServerError('Internal Server Error.');
      return res.status(internalServerError.ErrorCode).json(internalServerError.ErrorResponse);
    }
  },
};

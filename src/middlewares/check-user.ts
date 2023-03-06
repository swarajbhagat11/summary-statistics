import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpContext from 'express-http-context';
import { APIResponse } from '@utils/api-response';
import { AppError } from '@utils/app-error';
import { JWTPayload } from '@types';
import { HTTP_CONTEXT_KEYS } from '@constants/http-context-keys';
import logger from '@utils/logger';
import { decrypt } from '@utils/cryptography';

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('[checkUser:checkUser] - Check user middleware started.');
  const token = req.headers.authorization?.replace('Bearer ', '') || '';

  if (!token) {
    logger.error('[checkUser:checkUser] - Token not present in request header.');
    return APIResponse.errorResponse(res, AppError.ForbiddenError('A token is required for authentication.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as jwt.Secret) as { user: string };
    const userPayload = decrypt(decoded.user) as JWTPayload;
    httpContext.set(HTTP_CONTEXT_KEYS.USER_ID, userPayload.user_id);
    logger.info('[checkUser:checkUser] - Token verification successful.');
    return next();
  } catch (err) {
    logger.error('[checkUser:checkUser] - Token verification failed.', err);
    return APIResponse.errorResponse(res, AppError.UnauthorizedError('Invalid Token.'));
  }
};

export default checkUser;

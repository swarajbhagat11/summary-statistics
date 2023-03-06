import 'reflect-metadata';
import checkUser from './check-user';
import logger from '@utils/logger';
import { AppError } from '@utils/app-error';
import jwt from 'jsonwebtoken';
import { encrypt } from '@utils/cryptography';
import { Request, Response } from 'express';
import httpContext from 'express-http-context';
import { APIResponse } from '@utils/api-response';

describe('employee_service', () => {
  jest.mock('@utils/logger');
  jest.mock('express-http-context');
  jest.mock('jsonwebtoken');
  jest.mock('@utils/api-response');

  // mock objects
  const token = 'eyJhbGciOiJIUzI1XVCJ9.eyJ1c2VyIjoiMzk5NjFhN2JhMDE1NzM1ODAz.2E3TA64Aic4A_qGjhx2Q';
  const user_id = '230e0853-cdd8-4207-8f7d-647276b1732e';
  const email = 'akash.patil@test.com';
  const encryptedUser = encrypt({ user_id, email });

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it('check_user_should_authenticate_user_when_jwt_verify_successfully', async () => {
    jwt.verify = jest.fn().mockReturnValueOnce({ user: encryptedUser });
    httpContext.set = jest.fn();
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {} as Response;
    const next = jest.fn();

    checkUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('check_user_should_return_forbidden_error_when_token_not_present_in_header', async () => {
    APIResponse.errorResponse = jest.fn();
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = jest.fn();

    checkUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(APIResponse.errorResponse).toHaveBeenCalledWith(res, AppError.ForbiddenError('A token is required for authentication.'));
  });

  it('check_user_should_return_unauthorized_error_when_token_verification_failed', async () => {
    jwt.verify = jest.fn().mockReturnValueOnce(new Error('Token verification failed.'));
    APIResponse.errorResponse = jest.fn();
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {} as Response;
    const next = jest.fn();

    checkUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(APIResponse.errorResponse).toHaveBeenCalledWith(res, AppError.UnauthorizedError('Invalid Token.'));
  });
});

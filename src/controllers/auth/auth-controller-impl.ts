import { SERVICE_IDENTIFIER } from '@constants/identifiers';
import { AuthService } from '@services/auth';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { AuthController } from './auth-controller';
import { APIResponse } from '@utils/api-response';
import { LoginRequest } from '@types';
import logger from '@utils/logger';

// Use async & await, don't use .then(). Otherwise asyncErrorCather will not work
@injectable()
export class AuthControllerImpl implements AuthController {
  protected _authService: AuthService;

  constructor(
    @inject(SERVICE_IDENTIFIER.AUTH)
    authService: AuthService
  ) {
    this._authService = authService;
  }

  register = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[authControllerImpl:register] - Register call started.');

    const user = req.body;
    let [err, userRes] = await this._authService.register(user);

    logger.info('[authControllerImpl:register] - Register call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.createResponse(res, userRes);
  };

  login = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[authControllerImpl:login] - Login call started.');

    const loginRequest = req.body as LoginRequest;
    let [err, loginRes] = await this._authService.login(loginRequest);

    logger.info('[authControllerImpl:login] - Login call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.okResponse(res, loginRes);
  };
}

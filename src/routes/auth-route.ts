import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { AuthController } from '@controllers/auth';
import { CONTROLLER_IDENTIFIER } from '@constants/identifiers';
import { asyncControllerWrapper } from '@utils/async-controller-wrapper';
import { checkSchema } from 'express-validator';
import { LoginValidationsSchema, UserValidationsSchema } from '@validations/schema';

@injectable()
export class AuthRoute {
  protected _authController: AuthController;

  constructor(@inject(CONTROLLER_IDENTIFIER.AUTH) authController: AuthController) {
    this._authController = authController;
  }

  routes = () => {
    let router = Router();

    router.post('/login', checkSchema(LoginValidationsSchema), asyncControllerWrapper(this._authController.login));
    router.post('/register', checkSchema(UserValidationsSchema), asyncControllerWrapper(this._authController.register));

    return router;
  };
}

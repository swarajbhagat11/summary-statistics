import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { CONTROLLER_IDENTIFIER } from '@constants/identifiers';
import { asyncControllerWrapper } from '@utils/async-controller-wrapper';
import { EmployeeController } from '@controllers/employee';
import checkUser from '@middlewares/check-user';
import { checkSchema, param } from 'express-validator';
import { EmployeeValidationsSchema } from '@validations/schema';

@injectable()
export class EmployeeRoute {
  protected _employeeController: EmployeeController;

  constructor(@inject(CONTROLLER_IDENTIFIER.EMPLOYEE) employeeController: EmployeeController) {
    this._employeeController = employeeController;
  }

  routes = () => {
    let router = Router();

    router.post('/', checkUser, checkSchema(EmployeeValidationsSchema), asyncControllerWrapper(this._employeeController.create));
    router.delete(
      '/:id',
      checkUser,
      param('id', 'Employee id should be in UUID format.').isUUID().trim(),
      asyncControllerWrapper(this._employeeController.delete)
    );

    return router;
  };
}

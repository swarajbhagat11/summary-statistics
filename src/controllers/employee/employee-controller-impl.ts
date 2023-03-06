import { SERVICE_IDENTIFIER } from '@constants/identifiers';
import { EmployeeService } from '@services/employee';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { EmployeeController } from './employee-controller';
import { APIResponse } from '@utils/api-response';
import logger from '@utils/logger';
import { EmployeeAttributes } from '@models';

// Use async & await, don't use .then(). Otherwise asyncErrorCather will not work
@injectable()
export class EmployeeControllerImpl implements EmployeeController {
  protected _employeeService: EmployeeService;

  constructor(
    @inject(SERVICE_IDENTIFIER.EMPLOYEE)
    employeeService: EmployeeService
  ) {
    this._employeeService = employeeService;
  }

  create = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[EmployeeControllerImpl:create] - Create employee in system call started.');

    const employee = req.body as EmployeeAttributes;
    let [err, employeeRes] = await this._employeeService.create(employee);

    logger.info('[EmployeeControllerImpl:create] - Create employee in system call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.createResponse(res, employeeRes);
  };

  delete = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[EmployeeControllerImpl:delete] - Delete employee from system call started.');

    const employeeId = req.params.id;
    let [err, deleteRecordCnt] = await this._employeeService.delete(employeeId);

    logger.info('[EmployeeControllerImpl:delete] - Delete employee from system call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.deleteResponse(res, deleteRecordCnt);
  };
}

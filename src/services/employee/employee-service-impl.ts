import { REPOSITORIES_IDENTIFIER } from '@constants/identifiers';
import { EmployeeAttributes } from '@models';
import { EmployeeRepository } from '@repositories/employee';
import { inject, injectable } from 'inversify';
import { AppError, ApplicationError } from '@utils/app-error';
import logger from '@utils/logger';
import { EmployeeService } from './employee-service';

@injectable()
export class EmployeeServiceImpl implements EmployeeService {
  protected _employeeRepo: EmployeeRepository;

  constructor(
    @inject(REPOSITORIES_IDENTIFIER.EMPLOYEE)
    employeeRepo: EmployeeRepository
  ) {
    this._employeeRepo = employeeRepo;
  }

  create = async (employee: EmployeeAttributes): Promise<[ApplicationError | null, EmployeeAttributes | null]> => {
    logger.info('[EmployeeServiceImpl:create] - Create employee in system service call started.');

    let { name, salary, currency, on_contract = false, department, sub_department } = employee;
    let existingEmployee = await this._employeeRepo.findOne({ where: { name, salary, currency, on_contract, department, sub_department } });
    if (existingEmployee) {
      logger.error('[EmployeeServiceImpl:create] - Employee already exists with same details.');
      return [AppError.ConflictError('Employee already exists with same details.'), null];
    }
    // set on_contract false if not passed
    employee.on_contract = on_contract;
    let employeeRes = await this._employeeRepo.create(employee);

    logger.info('[EmployeeServiceImpl:create] - Create employee in system service call completed.');
    return [null, employeeRes];
  };

  delete = async (employeeId: string): Promise<[ApplicationError | null, number | null]> => {
    logger.info('[EmployeeServiceImpl:delete] - Delete employee from system service call started.');

    let existingEmployee = await this._employeeRepo.findOne({ where: { id: employeeId } });
    if (!existingEmployee) {
      logger.error('[EmployeeServiceImpl:delete] - Employee not exists with provided employee id.');
      return [AppError.NotFoundError('Employee does not exists with provided employee id.'), null];
    }
    let deleteRecordCnt = await this._employeeRepo.delete({ where: { id: employeeId } });

    logger.info('[EmployeeServiceImpl:delete] - Delete employee from system service call completed.');
    return [null, deleteRecordCnt];
  };
}

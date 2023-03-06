import 'reflect-metadata';
import { EmployeeServiceImpl } from './employee-service-impl';
import { EmployeeRepository } from '@repositories/employee';
import { EmployeeAttributes } from '@models';
import logger from '@utils/logger';
import { AppError } from '@utils/app-error';

describe('employee_service', () => {
  jest.mock('@utils/logger');
  let mockEmployeeRepo = jest.createMockFromModule<EmployeeRepository>('@repositories/employee');
  let employeeService: EmployeeServiceImpl;

  // mock objects
  const name = 'Akash Patil';
  const currency = 'USD';
  const salary = 150000;
  const on_contract = false;
  const department = 'Engineering';
  const sub_department = 'Infra';
  const employeeId = '230e0853-cdd8-4207-8f7d-647276b1732e';
  const mockEmployee = {
    name,
    currency,
    salary,
    on_contract,
    department,
    sub_department,
  } as EmployeeAttributes;
  const mockEmployeeInDBResponse = {
    ...mockEmployee,
    id: employeeId,
  } as EmployeeAttributes;

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
    employeeService = new EmployeeServiceImpl(mockEmployeeRepo);
  });

  it('create_should_add_employee_in_system_when_employee_not_present_in_system', async () => {
    mockEmployeeRepo.findOne = jest.fn().mockResolvedValueOnce(null);
    mockEmployeeRepo.create = jest.fn().mockResolvedValueOnce(mockEmployeeInDBResponse);

    const createRes = await employeeService.create(mockEmployee);

    expect(mockEmployeeRepo.create).toHaveBeenCalledWith(mockEmployee);
    expect(createRes[0]).toBeNull();
    expect(createRes[1]).toEqual(mockEmployeeInDBResponse);
  });

  it('create_should_fail_when_employee_already_present_in_system', async () => {
    mockEmployeeRepo.findOne = jest.fn().mockResolvedValueOnce(mockEmployeeInDBResponse);
    mockEmployeeRepo.create = jest.fn();

    const createRes = await employeeService.create(mockEmployee);

    expect(mockEmployeeRepo.create).toHaveBeenCalledTimes(0);
    expect(createRes[0]).toEqual(AppError.ConflictError('Employee already exists with same details.'));
    expect(createRes[1]).toBeNull();
  });

  it('delete_should_delete_employee_from_system_when_employee_present_in_system', async () => {
    mockEmployeeRepo.findOne = jest.fn().mockResolvedValueOnce(mockEmployeeInDBResponse);
    mockEmployeeRepo.delete = jest.fn().mockResolvedValueOnce(1);

    const deleteRes = await employeeService.delete(employeeId);

    expect(mockEmployeeRepo.delete).toHaveBeenCalledTimes(1);
    expect(deleteRes[0]).toBeNull();
    expect(deleteRes[1]).toEqual(1);
  });

  it('delete_should_fail_when_employee_not_present_in_system', async () => {
    mockEmployeeRepo.findOne = jest.fn().mockResolvedValueOnce(null);
    mockEmployeeRepo.delete = jest.fn();

    const deleteRes = await employeeService.delete(employeeId);

    expect(mockEmployeeRepo.delete).toHaveBeenCalledTimes(0);
    expect(deleteRes[0]).toEqual(AppError.NotFoundError('Employee does not exists with provided employee id.'));
    expect(deleteRes[1]).toBeNull();
  });
});

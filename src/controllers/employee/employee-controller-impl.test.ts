import 'reflect-metadata';
import { EmployeeControllerImpl } from './employee-controller-impl';
import { EmployeeService } from '@services/employee';
import { EmployeeAttributes } from '@models';
import logger from '@utils/logger';
import { Request } from 'express';
import { AppError } from '@utils/app-error';

describe('employee_controller', () => {
  jest.mock('@utils/logger');
  let mockEmployeeService = jest.createMockFromModule<EmployeeService>('@services/employee');
  let employeeController: EmployeeControllerImpl;

  // mock objects
  const token = 'eyJhbGciOiJIUzI1XVCJ9.eyJ1c2VyIjoiMzk5NjFhN2JhMDE1NzM1ODAz.2E3TA64Aic4A_qGjhx2Q';
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
    employeeController = new EmployeeControllerImpl(mockEmployeeService);
  });

  it('create_should_return_create_response_when_employee_creation_successful', async () => {
    mockEmployeeService.create = jest.fn().mockResolvedValueOnce([null, mockEmployeeInDBResponse]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: mockEmployee } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await employeeController.create(req, res as any);

    expect(mockEmployeeService.create).toHaveBeenCalledWith(mockEmployee);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('create_should_return_error_response_when_employee_creation_unsuccessful', async () => {
    mockEmployeeService.create = jest
      .fn()
      .mockResolvedValueOnce([AppError.ConflictError('Employee already exists with same details.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: mockEmployee } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await employeeController.create(req, res as any);

    expect(mockEmployeeService.create).toHaveBeenCalledWith(mockEmployee);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('delete_should_return_ok_response_when_employee_deletion_successful', async () => {
    mockEmployeeService.delete = jest.fn().mockResolvedValueOnce([null, 1]);
    const req = { headers: { authorization: `Bearer ${token}` }, params: { id: employeeId } } as any;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await employeeController.delete(req, res as any);

    expect(mockEmployeeService.delete).toHaveBeenCalledWith(employeeId);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('delete_should_return_error_response_when_employee_deletion_unsuccessful', async () => {
    mockEmployeeService.delete = jest
      .fn()
      .mockResolvedValueOnce([AppError.NotFoundError('Employee does not exists with provided employee id.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` }, params: { id: employeeId } } as any;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await employeeController.delete(req, res as any);

    expect(mockEmployeeService.delete).toHaveBeenCalledWith(employeeId);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
